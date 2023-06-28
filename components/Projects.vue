<script setup>
const query = gql`
{
  viewer {
    repositories(first: 6, orderBy:{field:CREATED_AT,direction: DESC}) {
      totalCount
      nodes {
        id
        name
        createdAt
        description
        url
        forks {
          totalCount
        }
        watchers {
          totalCount
        }
        stargazers {
          totalCount
        }
      }
    }
  }
}
`

const { data, error, refresh } = await useAsyncQuery(query)

onMounted(() => {
  refresh
})

</script>

<template>
  <main class="container mx-auto mt-8 mb-4">
    <!-- <div>{{ data }}</div> -->
    <h1 class="text-xl ml-4 mb-6 mt-14">Latest Projects</h1>
    <!-- project data -->
    <section v-if="data" class="grid grid-cols-1 sm:grid-cols-3 gap-8">
      <div v-for="project in data?.viewer?.repositories.nodes" :key="project.id"
        class="p-8 my-2 mx-2 hover:bg-neutral-800 border-gray-100 border-b hover:border-gray-300 hover:border-b-2">
        <a :href="project.url" target="_blank">
          <p class="text-xl text-gray-200 mb-2 hover:underline">{{ project.name }}</p>
        </a>
        <p v-if="project.description">{{ project.description }}</p>
        <div class="mt-2 flex justify-between">
          <div>
            <span>
              <!-- <Icon name="heroicons-outline:star" /> -->
            </span>
            <span class="font-semibold ml-2">{{ project.stargazers.totalCount }}</span>
          </div>
          <div>
            <!-- <Icon name="heroicons-outline:eye" /> -->
            <span class="ml-2">{{ project.watchers.totalCount }}</span>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>