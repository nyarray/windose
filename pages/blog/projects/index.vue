<template lang="pug">
#projects
	Transition
		.projects(v-if='projects?.length')
			.project-classify(v-for="(classify, index) in projects" :key="index")
				.project-classify-name {{ classify.name }}
				.project-list
					.project-item(v-for="(project, i) in classify.items" :key="i" @click="onItemClick(project)") 
						.project-cover-wrapper
							img.project-cover(:src="project.cover" :alt="project.name")
						.project-description
							.project-name {{ project.name }}
							//- .project-desc {{ project.desc }}
							.project-detail
								span {{ project.desc }}
						.project-type
							//- SIcon(v-if="project.type == 'github'" name="github")
							//- SIcon(v-else-if="project.type == 'website'" name="website")
		SLoading(v-else)
	//- .content(v-if="store.projects && store.projects.length")
		| Projects {{ store.projects }}
	//- SLoading(v-else)
</template>

<script setup lang="ts">

definePageMeta({
  layout: 'blog'
})

const store = useMainStore()
const router = useRouter()
const route = useRoute()
const page = route.params.page ? parseInt(route.params.page.toString()) : 1
const projects = computed(() => store.projects)
async function onChange(page: number) {
	router.push({ params: { page } })
}

Promise.all([
	store.getProjects(),
])
</script>

<style lang="scss" scoped>
.project-classify {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	flex-wrap: wrap;

	.project-list {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;

		.project-item {
			max-width: 12rem;
			margin: 1rem;
		}
	}
}

img {
	width: 12rem;
	height: 8rem;
	object-fit: cover;
}
</style>