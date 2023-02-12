import { ChangeEvent, useState } from 'react'

import { Button } from './components/Button'
import { csvToJson } from './utils/csv-to-json'
import { jsonToCsv } from './utils/json-to-csv'
import { saveFile } from './utils/save-file'

import './styles/app.css'

export function App() {
	const [content, setContent] = useState('')
	const [output, setOutput] = useState<any>([])
	const [lastConversion, setLastConversion] = useState<'csv2json' | 'json2csv'>()

	function handleFileSelect(event: ChangeEvent<HTMLInputElement>) {
		if (event.target.files) {
			const files = Array.from(event.target.files)
			const reader = new FileReader()

			reader.onload = async(e) => {
				if (e.target && typeof e.target.result == 'string') {
					const text = e.target.result
					setContent(text)
				}
			}

			reader.readAsText(files[0])
		}

		event.target.value = ''
	}

	function convertToJson() {
		if (content === '')
			return alert('Informe o conteúdo CSV')

		try {
			setOutput(csvToJson(content))
			setLastConversion('csv2json')
		} catch (err: any) {
			alert(err)
		}
	}

	function convertToCsv() {
		if (content === '')
			return alert('Informe o conteúdo JSON')

		try {
			setOutput(jsonToCsv(content))
			setLastConversion('json2csv')
		} catch (err: any) {
			alert(err.message)
		}
	}

	function handleClear() {
		setContent('')
		setOutput([])
	}

	function handleDownload() {
		if (output.length > 0) {
			if (lastConversion === 'csv2json')
				saveFile(JSON.stringify(output, null, 2), 'json')
			else
				saveFile(output.map((row: string[]) => row.join(';')).join('\n'), 'csv')
		}
	}

	function handleCopyToClipboard() {
		if (output.length > 0) {
			if (lastConversion === 'csv2json')
				navigator.clipboard.writeText(JSON.stringify(output, null, 2))
			else
				navigator.clipboard.writeText(output.join('\n'))
		}
	}

	return (
		<div className="container">
			<h1>JSON <i className='fas fa-arrows-left-right' /> CSV</h1>

			<div>
				<textarea
					rows={12}
					placeholder='Digite ou cole o JSON ou CSV aqui...'
					autoFocus
					value={content}
					onChange={e => setContent(e.target.value)}
					spellCheck={false}
				/>

				<div className='buttons'>
					<label className='button'>
						<i className='fas fa-upload' /> Selecionar arquivo
						<input type="file" onChange={handleFileSelect} accept='.csv, .json' />
					</label>

					<Button icon='circle-down' onClick={convertToJson}>Converter para JSON</Button>

					<Button icon='circle-down' onClick={convertToCsv}>Converter para CSV</Button>
				</div>
			</div>

			<div>
				<div className='result'>
					{
						output.length === 0 ? <i className='fas fa-file fa-10x' /> :
							lastConversion === 'csv2json' ? <pre>{JSON.stringify(output, null, 2)}</pre> :
								output.map((row: string[], index: number) => (
									<p key={index}>{row.join(';')}</p>
								))
					}
				</div>

				<div className='buttons'>
					<Button icon='download' onClick={handleDownload}>Baixar</Button>
					<Button icon='trash' onClick={handleClear}>Limpar</Button>
					<Button icon='copy' onClick={handleCopyToClipboard}>Copiar</Button>
				</div>
			</div>
		</div>
	)
}
