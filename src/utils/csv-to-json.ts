import { IObject } from "../interfaces/IObject"

export function csvToJson(text: string) {
	const rows = text.split('\n').map(r => r.replace('\r', ''))

	if (rows.length < 2)
		throw new Error('A quantidade mínima de linhas é 2')

	const commaCount = (rows[0].split('').filter(s => s === ',')).length
	const semicolonCount = (rows[0].split('').filter(s => s === ';')).length

	if (commaCount === 0 && semicolonCount === 0)
		throw new Error('CSV inválido')

	const delimiter = commaCount > semicolonCount ? ',' : ';'

	const data = rows.map(row => row.split(delimiter)).filter(row => row.join('') !== '')
	const fields = data[0]

	for (let field of fields)
		if (field.split(' ').length > 1 || field === '')
			throw new Error('Cabeçalho inválido')

	for (let row of data)
		if (row.length !== fields.length)
			throw new Error('CSV inválido')

	const jsonData: IObject[] = []

	for (let i = 1; i < data.length; i++) {
		const obj: IObject = {}

		for (let j = 0; j < fields.length; j++)
			obj[fields[j]] = data[i][j]

		jsonData.push(obj)
	}

	return jsonData
}
