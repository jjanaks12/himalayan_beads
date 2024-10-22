type Breakpoint = 'xs-phone' | 'phone' | 'tablet' | 'desktop' | 'widescreen' | 'largescreen'

type Responsive = {
    [propsname: Breakpoint | string]: string
}

const resolution: Responsive = {
    'xs-phone': "319px",
    'phone': "479px",
    'tablet': "719px",
    'desktop': "991px",
    'widescreen': "1199px",
    'largescreen': "1399px",
}

export default (media: Breakpoint) => {
    const responsiveList: Responsive = Object.keys(resolution)
        .reduce((acc, breakpoint) => ({
            ...acc, [breakpoint]: `(min-width: ${resolution[breakpoint]})`
        }), {})
    return responsiveList[media]
}