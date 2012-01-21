function setOverlay(obj) {
    switch(obj.value)
    {
        case 'beaches':
            overlay[0] = !overlay[0];
            break;
        case 'trails':
            overlay[1] = !overlay[1];
            break;
        default:
            alert('SHIT WENT WRONG WITH action.js setOverlay(obj)')
    }
    //alert('beaches=' + overlay[0] + ' trails=' + overlay[1]);
}