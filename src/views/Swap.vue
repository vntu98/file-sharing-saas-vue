<template>
    <form action="">
        <div class="mb-6">
            <div class="mb-2">
                <app-plan v-for="plan in plans" :key="plan.slug" :plan="plan"/>
            </div>
        </div>

        <button type="submit" class="bg-indigo-500 text-white px-4 py-3 leading-none rounded-lg font-medium">Swap</button>
    </form>
</template>

<script>
import axios from 'axios'
import AppPlan from '../components/AppPlan.vue'

export default {
  components: { AppPlan },
    data() {
        return {
            plans: []
        }
    },

    async mounted() {
        let response = await axios.get('/api/plans')

        this.plans = response.data.data
    },
}
</script>
