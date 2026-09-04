<script setup lang="ts">
interface Question {
  questionId: number
  questionText: string | null
  questionHelpText: string | null
  dtCreated: string | null
  dtUpdated: string | null
  createdbyid: number | null
  updatedbyid: number | null
}

const { data: questions, pending, error, refresh } = await useFetch<Question[]>('/api/questions', {
  default: () => []
})

const isSaving = ref(false)
const deletingId = ref<number | null>(null)
const editingId = ref<number | null>(null)
const isFormOpen = ref(false)
const form = reactive({
  questionText: '',
  questionHelpText: ''
})

const formTitle = computed(() => editingId.value ? 'Edit question' : 'Add question')
const canSave = computed(() => form.questionText.trim().length > 0 && !isSaving.value)

function openAddForm() {
  editingId.value = null
  form.questionText = ''
  form.questionHelpText = ''
  isFormOpen.value = true
}

function openEditForm(question: Question) {
  editingId.value = question.questionId
  form.questionText = question.questionText || ''
  form.questionHelpText = question.questionHelpText || ''
  isFormOpen.value = true
}

function closeForm() {
  isFormOpen.value = false
  editingId.value = null
  form.questionText = ''
  form.questionHelpText = ''
}

async function saveQuestion() {
  if (!canSave.value) {
    return
  }

  isSaving.value = true

  try {
    const payload = {
      questionText: form.questionText,
      questionHelpText: form.questionHelpText
    }

    if (editingId.value) {
      await $fetch(`/api/questions/${editingId.value}`, {
        method: 'PATCH',
        body: payload
      })
    } else {
      await $fetch('/api/questions', {
        method: 'POST',
        body: payload
      })
    }

    closeForm()
    await refresh()
  } finally {
    isSaving.value = false
  }
}

async function deleteQuestion(question: Question) {
  if (!confirm(`Delete "${question.questionText || 'this question'}"?`)) {
    return
  }

  deletingId.value = question.questionId

  try {
    await $fetch(`/api/questions/${question.questionId}`, {
      method: 'DELETE'
    })
    await refresh()
  } finally {
    deletingId.value = null
  }
}
</script>

<template>
  <UContainer class="py-10 space-y-6">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-3xl font-semibold tracking-tight text-highlighted">
          Questions
        </h1>
        <p class="mt-2 text-sm text-muted">
          Create and manage the questions used by your story templates.
        </p>
      </div>

      <UButton
        icon="i-lucide-plus"
        label="Add question"
        size="lg"
        @click="openAddForm"
      />
    </div>

    <UCard v-if="isFormOpen" :ui="{ body: 'space-y-4' }">
      <div class="flex items-center justify-between gap-3">
        <h2 class="text-lg font-semibold text-highlighted">
          {{ formTitle }}
        </h2>

        <UButton
          icon="i-lucide-x"
          color="neutral"
          variant="ghost"
          aria-label="Close form"
          @click="closeForm"
        />
      </div>

      <UFormField label="Question text" required>
        <UTextarea
          v-model="form.questionText"
          :rows="3"
          maxlength="200"
          placeholder="What should the user answer?"
        />
      </UFormField>

      <UFormField label="Help text">
        <UTextarea
          v-model="form.questionHelpText"
          :rows="4"
          maxlength="1024"
          placeholder="Optional guidance shown with the question."
        />
      </UFormField>

      <div class="flex justify-end gap-2">
        <UButton
          label="Cancel"
          color="neutral"
          variant="subtle"
          @click="closeForm"
        />
        <UButton
          icon="i-lucide-save"
          :label="editingId ? 'Save changes' : 'Create question'"
          :loading="isSaving"
          :disabled="!canSave"
          @click="saveQuestion"
        />
      </div>
    </UCard>

    <UAlert
      v-if="error"
      icon="i-lucide-circle-alert"
      color="error"
      variant="subtle"
      title="Could not load questions"
      :description="error.message"
    />

    <UCard>
      <div v-if="pending" class="flex items-center gap-3 py-8 text-muted">
        <UIcon name="i-lucide-refresh-cw" class="size-5 animate-spin" />
        <span>Loading questions...</span>
      </div>

      <div v-else-if="questions.length === 0" class="py-10 text-center">
        <h2 class="text-lg font-semibold text-highlighted">
          No questions yet
        </h2>
        <p class="mt-2 text-sm text-muted">
          Add your first question to start shaping a template.
        </p>
        <UButton
          icon="i-lucide-plus"
          label="Add question"
          class="mt-5"
          @click="openAddForm"
        />
      </div>

      <ul v-else class="divide-y divide-default">
        <li
          v-for="question in questions"
          :key="question.questionId"
          class="flex flex-col gap-4 py-5 sm:flex-row sm:items-start sm:justify-between"
        >
          <div class="min-w-0 space-y-2">
            <div class="flex items-center gap-2 text-xs font-medium text-muted">
              <span>#{{ question.questionId }}</span>
              <span v-if="question.dtUpdated">Updated {{ new Date(question.dtUpdated).toLocaleDateString() }}</span>
            </div>
            <p class="text-base font-medium text-highlighted">
              {{ question.questionText }}
            </p>
            <p v-if="question.questionHelpText" class="text-sm text-muted">
              {{ question.questionHelpText }}
            </p>
          </div>

          <div class="flex shrink-0 gap-2">
            <UButton
              icon="i-lucide-pencil"
              color="neutral"
              variant="subtle"
              aria-label="Edit question"
              @click="openEditForm(question)"
            />
            <UButton
              icon="i-lucide-trash-2"
              color="error"
              variant="subtle"
              aria-label="Delete question"
              :loading="deletingId === question.questionId"
              @click="deleteQuestion(question)"
            />
          </div>
        </li>
      </ul>
    </UCard>
  </UContainer>
</template>