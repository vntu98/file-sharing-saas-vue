<template>
    <form action="" @submit.prevent="swap">
        <div class="mb-6">
            <div v-for="plan in plans" :key="plan.slug" class="mb-2 flex items-center">
                <input type="radio" name="plan" :id="`plan_${plan.slug}`" class="mr-3" v-model="form.plan" :value="plan.slug" v-if="availablePlans.find(p => p.slug === plan.slug)">
                <label :for="`plan_${plan.slug}`" class="flex-grow">
                    <app-plan :plan="plan"/>
                </label>
            </div>
        </div>

        <button type="submit" class="bg-indigo-500 text-white px-4 py-3 leading-none rounded-lg font-medium" v-if="availablePlans.length">Swap</button>
        <p v-else class="text-gray-800 text-sm">There are no available plans for you to swap to right now, because your're using too much storage.</p>
    </form>
</template>

<script>
import axios from 'axios'
import AppPlan from '../components/AppPlan.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: { AppPlan },
    data() {
        return {
            plans: [],
            planAvailability: [],
            form: {
                plan: null
            }
        }
    },

    computed: {
        ...mapGetters({
            user: 'auth/user'
        }),

        availablePlans() {
            return this.plans.filter(p => p.slug !== this.user.plan.slug && this.planAvailability[p.slug])
        }
    },

    async mounted() {
        let plans = await axios.get('/api/plans')
        this.plans = plans.data.data

        let planAvailability = await axios.get('/api/user/plan_availability')
        this.planAvailability = planAvailability.data.data
    },

    methods: {
        ...mapActions({
            me: 'auth/me'
        }),

        async swap() {
            await axios.patch('/api/subscriptions', this.form)
            await this.me()

            this.$router.replace({ name: 'account' })
        }
    },
}
</script>
