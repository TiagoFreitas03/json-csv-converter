export function jsonToCsv(content: string) {
	try {
		const json = JSON.parse(content)

		if (!json.length)
			throw new Error('O conteúdo JSON deve ser um array')

		const fields = Object.keys(json[0])
		const rows: string[][] = [fields]

		for (let obj of json) {
			const keys = Object.keys(obj) as string[]
			const values = Object.values(obj) as string[]

			if (keys.join('-').toUpperCase() !== fields.join('-').toUpperCase())
				throw new Error('Atributos inválidos')

			if (values.length !== fields.length)
				throw new Error('Valores inválidos')

			rows.push(values)
		}

		return rows
	} catch (err) {
		throw new Error('JSON inválido')
	}
}
