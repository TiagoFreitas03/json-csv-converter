export async function saveFile(content: string, extension: string) {
	if (content == '')
		return

	const blob = new Blob([content])

	const downloadBtn = document.createElement('a')
	downloadBtn.download = `file.${extension}`
	downloadBtn.href = URL.createObjectURL(blob)

	downloadBtn.onclick = () => {
		setTimeout(() => URL.revokeObjectURL(downloadBtn.href), 30 * 1000)
	}

	downloadBtn.click()
}
