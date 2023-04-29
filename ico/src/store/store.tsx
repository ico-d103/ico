import { createStore, atom } from 'jotai';

export const mainStore = createStore()

// export const countAtom = atom(0)
// myStore.set(countAtom, 1)
// const unsub = myStore.sub(countAtom, () => {
//   console.log('countAtom value is changed to', myStore.get(countAtom))
// })

const navTo = atom({url: '', transition: ''})
// const countAtom = atomWithStore<number>(
//     (get) => get(store).count,
//     (get, set, update) => {
//       set(store, { ...get(store), count: update(get(store).count) })
//     }
//   )



export default mainStore;

export {
    navTo
};
