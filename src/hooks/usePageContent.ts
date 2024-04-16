import type PageContent from '@/components/page-content/page-content.vue'
import { ref } from 'vue'

function usePageContent() {

  const contentRef = ref<InstanceType<typeof PageContent>>()
  function handleQueryClick(formData: any) {
    contentRef.value?.getList(formData)
  }
  function handleResetClick() {
    contentRef.value?.getList()
  }
  return{
    contentRef,
    handleQueryClick,
    handleResetClick
  }
}

export default usePageContent
