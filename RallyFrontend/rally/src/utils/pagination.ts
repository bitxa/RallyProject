import { ref, computed, type Ref } from "vue";

export function usePagination(itemsPerPage: Ref<number>, data: Ref<any[]>, currentPage: Ref<number>) {
  const numberOfPages = computed(() =>
    Math.ceil(data.value.length / itemsPerPage.value)
  );

  const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return data.value.slice(start, end);
  });

  const goToNextPage = () => {
    if (currentPage.value < numberOfPages.value) {
      currentPage.value++;
    }
  };

  const goToPreviousPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--;
    }
  };

  return {
    currentPage,
    numberOfPages,
    paginatedData,
    goToNextPage,
    goToPreviousPage,
  };
}
