document.addEventListener('DOMContentLoaded', () => {
    const qrContainer = document.getElementById('qr-container');
    const statusMessage = document.getElementById('status-message');
    const newQrBtn = document.getElementById('new-qr-btn');

    function getQRCode() {
        // Clear previous QR code and show loading message
        qrContainer.innerHTML = '';
        statusMessage.textContent = 'Requesting QR code...';
        qrContainer.appendChild(statusMessage);
        newQrBtn.disabled = true;

        const qrImage = document.createElement('img');

        // Use a timestamp to prevent browser caching
        qrImage.src = `/qr?t=${new Date().getTime()}`;

        qrImage.onload = () => {
            qrContainer.innerHTML = ''; // Clear status message
            qrContainer.appendChild(qrImage);
            newQrBtn.disabled = false;
        };

        qrImage.onerror = () => {
            qrContainer.innerHTML = '';
            statusMessage.textContent = 'Failed to load QR code. Please try again.';
            qrContainer.appendChild(statusMessage);
            newQrBtn.disabled = false;
        };
    }

    newQrBtn.addEventListener('click', getQRCode);
});
