import { type ReportHandler } from 'web-vitals';

// This is a React utility which comes out of the box with installment.
const reportWebVitals = (onPerfEntry?: ReportHandler): void => {
  if (onPerfEntry != null && onPerfEntry instanceof Function) {
    import('web-vitals')
      .then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(onPerfEntry);
        getFID(onPerfEntry);
        getFCP(onPerfEntry);
        getLCP(onPerfEntry);
        getTTFB(onPerfEntry);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
};

export default reportWebVitals;
