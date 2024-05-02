<script setup lang="ts">
import { Icon } from '@iconify/vue/dist/iconify.js'
import { type DateRange } from 'radix-vue'
import { toDate } from 'radix-vue/date'

const emit = defineEmits(['setRange'])

const date = ref<DateRange>()

watchEffect(() => {
	if (date.value && date.value.end && date.value.start) {
		emit('setRange', toDate(date.value.start), toDate(date.value.end))
	}
})
</script>

<template>
	<DateRangePickerRoot :required="true" v-model="date">
		<DateRangePickerField
			v-slot="{ segments }"
			class="flex items-center justify-between bg-background border-2 border-border rounded select-none p-2 text-foreground outline-primary focus-visible:outline">
			<div class="flex items-center">
				<template v-for="item in segments.start" :key="item.part">
					<DateRangePickerInput
						v-if="item.part === 'literal'"
						:part="item.part"
						type="start">
						{{ item.value }}
					</DateRangePickerInput>
					<DateRangePickerInput
						v-else
						:part="item.part"
						type="start"
						class="px-1 rounded outline-primary outline-offset-1 focus-visible:outline">
						{{ item.value }}
					</DateRangePickerInput>
				</template>
				<span class="mx-2"> - </span>
				<template v-for="item in segments.end" :key="item.part">
					<DateRangePickerInput
						v-if="item.part === 'literal'"
						:part="item.part"
						type="end">
						{{ item.value }}
					</DateRangePickerInput>
					<DateRangePickerInput
						v-else
						:part="item.part"
						type="end"
						class="px-1 rounded outline-primary outline-offset-1 focus-visible:outline">
						{{ item.value }}
					</DateRangePickerInput>
				</template>
			</div>
			<DateRangePickerTrigger
				class="flex items-center justify-center rounded outline-primary focus-visible:outline">
				<Icon icon="lucide:calendar-range" class="size-6" />
			</DateRangePickerTrigger>
		</DateRangePickerField>
		<DateRangePickerContent
			:side-offset="14"
			class="rounded bg-background border-2 border-border text-foreground">
			<DateRangePickerCalendar v-slot="{ weekDays, grid }" class="p-2">
				<DateRangePickerHeader class="flex items-center justify-between">
					<DateRangePickerPrev
						class="flex items-center justify-center rounded size-6 outline-primary focus-visible:outline">
						<Icon icon="lucide:chevron-left" />
					</DateRangePickerPrev>
					<DateRangePickerHeading />
					<DateRangePickerNext
						class="flex items-center justify-center rounded size-6 outline-primary focus-visible:outline">
						<Icon icon="lucide:chevron-right" />
					</DateRangePickerNext>
				</DateRangePickerHeader>
				<DateRangePickerGrid
					v-for="month in grid"
					:key="month.value.toString()"
					class="space-y-1 mt-2">
					<DateRangePickerGridHead>
						<DateRangePickerGridRow class="mb-1 flex w-full justify-between">
							<DateRangePickerHeadCell
								v-for="day in weekDays"
								:key="day"
								class="w-8 rounded text-sm">
								{{ day }}
							</DateRangePickerHeadCell>
						</DateRangePickerGridRow>
					</DateRangePickerGridHead>
					<DateRangePickerGridBody>
						<DateRangePickerGridRow
							v-for="(weekDates, index) in month.rows"
							:key="`weekDate-${index}`"
							class="flex w-full">
							<DateRangePickerCell
								v-for="weekDate in weekDates"
								:key="weekDate.toString()"
								:date="weekDate">
								<DateRangePickerCellTrigger
									:day="weekDate"
									:month="month.value"
									class="relative flex items-center justify-center rounded size-8 data-[selected]:!bg-primary data-[selected]:!text-primary-foreground hover:bg-primary/30 data-[highlighted]:bg-primary/30 data-[disabled]:text-muted-foreground">
								</DateRangePickerCellTrigger>
							</DateRangePickerCell>
						</DateRangePickerGridRow>
					</DateRangePickerGridBody>
				</DateRangePickerGrid>
			</DateRangePickerCalendar>
		</DateRangePickerContent>
	</DateRangePickerRoot>
</template>
