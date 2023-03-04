let validationMessages = {
		email: 'Value is not valid email address.',
		required: 'Value is required.',
}

class ValidationRules {

	required(value) {
			return value.length > 0
	}

	email(value) {
			let pattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
			return pattern.test(value)
	}
}

class Form {
	constructor(settings) {
			this.formId = settings.id
			this.validations = settings.validations
			this.errorMsgClass = '.' + settings.config.errorMsgClass

			this.validationRules = new ValidationRules

			this.validationMessages = validationMessages

			this.form = document.getElementById(this.formId)
			this.elements = document.getElementById(this.formId).elements

			this.fields = {}
			this.setFields()
			this.listenForKeys()

	}

	setFields() {
			for (let el of this.elements) {
					if (el.name != '') this.fields[el.name] = el.value
			}
	}

	listenForKeys() {
			for (let el of this.elements) {
					let parent = el.parentElement
					el.addEventListener('keyup', () => {
							this.fields[el.name] = el.value
							if (parent.classList.contains('text-red-700')) {
									parent.classList.remove('text-red-700')
									parent.querySelector(this.errorMsgClass).style.display = 'none'
							}
					})
					el.addEventListener('blur', () => {
							this.fields[el.name] = el.value
							this.validate(el.name, el.value)
					})
			}
	}

	validate(field, value) {
			if (this.validations.hasOwnProperty(field)) {
					for (let rule in this.validations[field]) {
							this.isValid(this.validations[field][rule], field, value)
					}
			}
	}

	submit(event) {
			event.preventDefault()
			for (let el of this.elements) {
				this.fields[el.name] = el.value
				this.validate(el.name, el.value)
			}
	}

	isValid(rule, field, value) {
			let parent = this.elements[field].parentElement
			if (!this.validationRules[rule](value)) {
					
					let errorMsg = parent.querySelector(this.errorMsgClass)
					errorMsg.style.display = 'block'
					errorMsg.innerHTML = this.validationMessages[rule]
					this.elements[field].parentElement.classList.add('text-red-700')
			}
	}
}