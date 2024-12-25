import type {
	ActionReducerMapBuilder,
	AsyncThunk,
	PayloadAction
} from "@reduxjs/toolkit"
import { castDraft } from "immer"

export type AsyncState<T> = {
	status: "idle" | "loading" | "succeeded" | "failed"
	data: T
	error: string | null
}

export const handleAsyncActions = <T, ThunkArg>(
	builder: ActionReducerMapBuilder<AsyncState<T>>,
	thunk: AsyncThunk<T, ThunkArg, Record<string, unknown>>
) => {
	builder
		.addCase(thunk.pending, (state) => {
			state.status = "loading"
			state.error = null
		})
		.addCase(thunk.fulfilled, (state, action: PayloadAction<T>) => {
			state.status = "succeeded"
			state.data = castDraft(action.payload)
		})
		.addCase(thunk.rejected, (state, action) => {
			state.status = "failed"
			state.error = action.error.message ?? null
		})
}
