const userAgent = navigator.userAgent.toLowerCase();

// checks if the device is tablet
// eslint-disable-next-line max-len
export const isTablet = () => /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(userAgent);

// checks if the device is mobile
export const isMobile = () => /android|webos|ipad|iphone|ipod|blackberry|iemobile|opera mini/i.test(userAgent);

// checks if the device is mobile, except tablets
export const isMobileOnly = () => !isTablet() && /android|webos|iphone|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
