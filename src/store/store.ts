

import { createStore } from 'vuex';
import { filmsModule } from './modules/films.ts';
import { listsModule } from './modules/lists.ts';
import { profileModule } from './modules/profile.ts';



export const store = createStore({
  modules: {
    films: filmsModule,
    lists: listsModule,
    profile: profileModule,
  },
});