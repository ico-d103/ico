package com.ico.api.service.news;

import com.ico.api.dto.news.NewsReqDto;
import com.ico.api.dto.news.NewsResDto;
import com.ico.api.user.JwtTokenProvider;
import com.ico.api.util.Formatter;
import com.ico.core.code.Role;
import com.ico.core.entity.Nation;
import com.ico.core.entity.News;
import com.ico.core.entity.Student;
import com.ico.core.exception.CustomException;
import com.ico.core.exception.ErrorCode;
import com.ico.core.repository.NationRepository;
import com.ico.core.repository.NewsRepository;
import com.ico.core.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/**
 * 학급 소식 관련 Service 로직
 *
 * @author 서재건
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class NewsServiceImpl implements NewsService {

    private final NewsRepository newsRepository;
    private final NationRepository nationRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final StudentRepository studentRepository;

    @Override
    public List<NewsResDto> findAllNews(HttpServletRequest request) {
        Long nationId = jwtTokenProvider.getNation(jwtTokenProvider.parseJwt(request));

        List<News> newsList = newsRepository.findAllByNationIdOrderByUpdatedAtDesc(nationId);
        List<NewsResDto> resList = new ArrayList<>();
        for (News news : newsList) {
            String createdAt = news.getCreatedAt().format(Formatter.date);
            String updatedAt = news.getUpdatedAt().format(Formatter.date);
            resList.add(new NewsResDto().of(news, createdAt, updatedAt));
        }
        return resList;
    }

    @Override
    public void addNews(NewsReqDto dto, HttpServletRequest request) {
        String token = jwtTokenProvider.parseJwt(request);
        Long nationId = jwtTokenProvider.getNation(token);
        Long studentId = jwtTokenProvider.getId(token);
        Role role = jwtTokenProvider.getRole(token);

        String author = getUserNameIfAuthorized(role, studentId);

        Nation nation = nationRepository.findById(nationId)
                .orElseThrow(() -> new CustomException(ErrorCode.NATION_NOT_FOUND));

        // 학급 규칙 제목 중복 체크
        if (newsRepository.findByNationIdAndTitle(nationId, dto.getTitle()).isPresent()) {
            throw new CustomException(ErrorCode.ALREADY_EXIST_TITLE);
        }

        News news = News.builder()
                .nation(nation)
                .title(dto.getTitle())
                .detail(dto.getDetail())
                .author(author)
                .build();

        newsRepository.save(news);
    }

    @Override
    public void updateNews(NewsReqDto dto, Long newsId, HttpServletRequest request) {
        // newsId 학급 소식에 접근 권한이 있다면 News 반환
        News news = fetchIfValidatedNewsAccess(newsId, request);

        // 학급 규칙 제목 중복 체크
        if (newsRepository.findByIdNotAndNationIdAndTitle(newsId, news.getNation().getId(), dto.getTitle()).isPresent()) {
            throw new CustomException(ErrorCode.ALREADY_EXIST_TITLE);
        }

        news.updateNews(dto.getTitle(), dto.getDetail());

        newsRepository.save(news);
    }

    @Override
    public void deleteNews(Long newsId, HttpServletRequest request) {
        // newsId 학급 소식에 접근 권한이 있다면 News 반환
        News news = fetchIfValidatedNewsAccess(newsId, request);

        newsRepository.delete(news);
    }

    @Override
    public NewsResDto findNews(long newsId, HttpServletRequest request) {
        Long nationId = jwtTokenProvider.getNation(jwtTokenProvider.parseJwt(request));

        News news = newsRepository.findById(newsId)
                .orElseThrow(() -> new CustomException(ErrorCode.NEWS_NOT_FOUND));

        if (!Objects.equals(nationId, news.getNation().getId())) {
            // 나라 id가 다른 경우
            throw new CustomException(ErrorCode.NOT_AUTHORIZATION_NATION);
        }

        String createdAt = news.getCreatedAt().format(Formatter.date);
        String updatedAt = news.getUpdatedAt().format(Formatter.date);

        return new NewsResDto().of(news, createdAt, updatedAt);
    }

    /**
     * newsId 학급 소식에 접근 권한이 있는지 체크 후 News 반환
     *
     * @param newsId
     * @param request
     * @return 접근 권한이 있다면 News 반환
     */
    private News fetchIfValidatedNewsAccess(Long newsId, HttpServletRequest request) {
        String token = jwtTokenProvider.parseJwt(request);
        Long nationId = jwtTokenProvider.getNation(token);
        Long studentId = jwtTokenProvider.getId(token);
        Role role = jwtTokenProvider.getRole(token);

        String author = getUserNameIfAuthorized(role, studentId);

        News news = newsRepository.findById(newsId)
                .orElseThrow(() -> new CustomException(ErrorCode.NEWS_NOT_FOUND));

        // 나라 일치 여부 확인
        if (!news.getNation().getId().equals(nationId)) {
            throw new CustomException(ErrorCode.NOT_AUTHORIZATION_NATION);
        }

        // 작성자 확인, 선생님은 전부 접근 가능
        if (!"선생님".equals(author) && !Objects.equals(news.getAuthor(), author)) {
            throw new CustomException(ErrorCode.WRONG_ROLE);
        }

        return news;
    }

    /**
     * 권한이 있는지 확인하고, 만약 권한이 있으면 사용자의 이름을 반환한다.
     *
     * @param role
     * @return "선생님" 또는 권한 있는 학생의 이름
     */
    private String getUserNameIfAuthorized(Role role, Long studentId) {
        if (role == Role.STUDENT) {
            Student student = studentRepository.findById(studentId)
                    .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
            String emPowered = student.getEmpowered();
            // 권한이 없거나 비어있다면 Error
            if (emPowered == null || emPowered.trim().isEmpty() || !emPowered.contains("6")) {
                throw new CustomException(ErrorCode.WRONG_ROLE);
            }
            return student.getName();
        }
        return "선생님";
    }
}
