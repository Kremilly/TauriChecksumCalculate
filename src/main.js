const { invoke } = window.__TAURI__.tauri;

async function calculateChecksum(file) {
	const reader = new FileReader();
	
	reader.onload = async () => {
		try {
			const checksum = await invoke('calculate_checksum', {
				file_name: file.name,
				fileData: Array.from(
					new Uint8Array(reader.result)
				),
			});
			
			document.getElementById('checksum-result-input').value = `${checksum}`;
			document.getElementById('checksum-result-input').style.display = 'block';
			document.getElementById('checksum-result').style.display = 'none';
		} catch (error) {
			document.getElementById('checksum-result').textContent = 'Error calculating checksum.';
			document.getElementById('checksum-result').style.display = 'block';
		}
	};
	
	reader.readAsArrayBuffer(file);
}

document.getElementById('file-input').addEventListener('change', (event) => {
	const file = event.target.files[0];
	
	if (file) {
		calculateChecksum(file);
	} else {
		document.getElementById('checksum-result').textContent = 'Please select a file.';
		document.getElementById('checksum-result-input').style.display = 'none';
	}
});

document.getElementById('checksum-result-input').addEventListener('click', (event) => {
	const input = event.target;
	
	input.select();
	navigator.clipboard.writeText(input.value);
});