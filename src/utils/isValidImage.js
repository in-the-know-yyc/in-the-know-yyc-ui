const isValidImageUrl = (imagePath) => {
    // It only validates if the image path contains HTTPS. If not, returns the default image (logo)
    const regex = /^(https?:\/\/)/;
    return (regex.test(imagePath)) ? imagePath : '/images/default-logo.webp';
}

export default isValidImageUrl;