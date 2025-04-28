
<template>
  <div>
    <button 
      :class="['search__button', number === 1 ? 'search__button-disabled' : '']"
      @click="prev(1, number)"
    >
      ←
    </button>
    <button
      v-for="item in visiblePages"
      :key="item"
      :class="['search__button', item === number || item === '...'? 'search__button-disabled' : '']"
      @click="typeof item === 'number' && loadPage(item)"
    >
      {{ item }}
    </button>
    <button 
      :class="['search__button', number === totalPage ? 'search__button-disabled' : '']"
      @click="next(1, number)"
    >
      →
    </button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  props: {
    number: {
      type: Number,
      required: true,
    },
    totalPage: {
      type: Number,
      required: true,
    },
  },
  emits:['next', 'prev', 'loadPage'],
  setup(props, ctx) {
    const visiblePages = computed(() => {
      const total = props.totalPage;
      const current = props.number;
      const delta = 1;
      

      const range: (number | string)[] = [];

      if (total <= 7) {
        for (let i = 1; i <= total; i++) range.push(i);
      } else {
        range.push(1);

        if (current === 4){
          for (let i = 2; i < current; i++){
            console.log(range);
            if(!range.includes(i)){
              range.push(i);
            }
          }
        } else if(current > 4){
          range.push('...');
        }

        const start = Math.max(2, current - delta);
        const end = Math.min(total - 1, current + delta);

        for (let i = start; i <= end; i++) {
          if (!range.includes(i)) {
            range.push(i);
          }
        }

        if (end < total - 2) {
          range.push('...');
        } else if (end === total - 2) {
          range.push(total - 1); 
        }

        range.push(total);
      }
      console.log(range);
      
      return range;
    });
    const next = (num : number, numberPage: number) => {
      ctx.emit('next', num, numberPage);
    };
    const prev = (num : number, numberPage: number) => {
      ctx.emit('prev', num, numberPage);
    };
    const loadPage = (item : number) => {
      ctx.emit('loadPage', item);
    };

    return {
      visiblePages,
      next,
      prev,
      loadPage,
    };
  },
});
</script>

<style scoped>
.search__buttons{
  margin: 5px;
  display: flex;
  gap: 10px;
  overflow: hidden;
}
.search__button{
  cursor: pointer;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  transition: all 0.5s ease-in-out;
}
.search__button:hover{
  background-color: #0eba81;
}
.search__buttons-disabled{
  display: none;
}
.search__button-disabled{
  opacity: 0.3;
  background-color: #0eba81;
  pointer-events: none;
}
</style>