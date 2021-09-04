const viewport = {
	getViewport() {
		const width = window.outerWidth;

		return {
			isSmallMobile: width <= 479,

			isLargeMobile: width > 479 && width <= 767,

			isMobile: width <= 767,

			isTablet: width > 767 && width <= 991,

			isSmallDesktop: width > 991 && width <= 1199,

			isLargeDesktop: width > 1199,

			isDesktop: width > 991,

			isMobileOrTablet: width <= 991,

			isTabletOrDesktop: width > 767,
		};
	},
};

export default viewport;
