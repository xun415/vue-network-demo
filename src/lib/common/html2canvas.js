import html2canvas from 'html2canvas'
export function aDownload(url, fileName) {
	const a = document.createElement('a')
	a.href = url
	a.target = '_blank'
	a.download = fileName || ''
	document.body.appendChild(a)
	a.click()
	a.remove()
}
// 링크 다운로드 구현
export function fileDownload(data, fileName) {
	console.log('## aDownload Call: ', data, ' fileName: ', fileName)
	if (data) {
		const url = window.URL.createObjectURL(data)
		aDownload(url, fileName)
		window.URL.revokeObjectURL(url)
	}
}
/**
 * 지정된 영역을 image/png 형식으로 다운로드 합니다.
 * backgroundColor : null
 *
 * * 4/28 이슈대응 : not allowed to navigate top frame to data url base64
 * (크롬 보안 업데이트로  base64 데이터 url 열지 못하여 이미지다운로드 실패 에러 발생
 *	=> blob 변환 후 다운로드)
 *
 * @param targetElement 다운로드 영역
 * @param fileName 파일명
 */
export async function downloadHtmlToImg(targetElement, fileName) {
	const canvas =  await html2canvas(targetElement, {backgroundColor: null, scale: 2})
	console.log(canvas)
	const imageUrl = canvas.toDataURL('image/png')
	const blob = await (await fetch(imageUrl)).blob();

	fileDownload(blob, fileName)

	return true
}