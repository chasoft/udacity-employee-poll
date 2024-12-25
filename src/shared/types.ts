export type User = {
	id: string
	name: string
	avatarURL: string
	answers: {
		[key: string]: string
	}
	questions: string[]
}

export type Users = {
	[key: string]: User
}

export type Option = {
	votes: string[]
	text: string
}

export type Question = {
	id: string
	author: string
	timestamp: number
	optionOne: Option
	optionTwo: Option
}

export type Questions = {
	[key: string]: Question
}
