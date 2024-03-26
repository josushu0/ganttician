<script setup lang="ts">
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-vue-next'
import { cn } from '~/lib/utils'

const props = defineProps<{
	value:
		| {
				start: number | Date
				end: number | Date
		  }
		| undefined
	componentField: any
}>()

const date = props.value
</script>

<template>
	<Popover>
		<PopoverTrigger as-child>
			<FormControl>
				<Button
					variant="outline"
					:class="
						cn('ps-3 text-start font-normal', !value && 'text-muted-foreground')
					">
					<span>
						{{
							props.value?.start
								? props.value?.end
									? `${format(props.value?.start, 'LLL dd, y')} - ${format(props.value?.end, 'LLL dd, y')}`
									: format(props.value?.start, 'LLL dd, y')
								: 'Pick a date'
						}}
					</span>
					<CalendarIcon class="ms-auto h-4 w-4 opacity-50" />
				</Button>
			</FormControl>
		</PopoverTrigger>
		<PopoverContent class="p-0 w-auto">
			<Calendar
				v-model.range="date"
				v-bind="props.componentField"
				:columns="2" />
		</PopoverContent>
	</Popover>
</template>
