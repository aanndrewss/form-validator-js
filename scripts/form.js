let form = new Form({
	id: 'registrationForm',
	validations: {
			email: ['email', 'required'],
			firstName: ['required'],
			password: ['required']
	},
	config: {
			errorMsgClass: 'error',
	}
})