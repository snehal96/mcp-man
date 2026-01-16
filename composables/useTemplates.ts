import { templates, type Template } from '~/utils/templates'

export const useTemplates = () => {
  const getTemplateById = (id: string): Template | undefined => {
    return templates.find(t => t.id === id)
  }

  const getTemplatesByCategory = (category: Template['category']): Template[] => {
    return templates.filter(t => t.category === category)
  }

  return {
    templates,
    getTemplateById,
    getTemplatesByCategory,
  }
}

