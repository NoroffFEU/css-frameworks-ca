const ImagePlaceholder = (modifier)=>{
    const iconSize = modifier || 'icon-medium'
    const icon = document.createElement('i');
    icon.classList.add('bi', 'bi-person-circle', iconSize);
    return icon;
}

export default ImagePlaceholder;

