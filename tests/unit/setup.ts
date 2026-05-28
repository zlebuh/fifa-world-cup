import '@testing-library/jest-dom'

// jsdom does not implement Intl.supportedValuesOf — shim it for tests
if (!('supportedValuesOf' in Intl)) {
  Object.defineProperty(Intl, 'supportedValuesOf', {
    value: (key: string): string[] => {
      if (key === 'timeZone') {
        return ['UTC', 'America/New_York', 'America/Los_Angeles', 'Europe/London',
                'Europe/Paris', 'Asia/Tokyo', 'Asia/Shanghai', 'Australia/Sydney']
      }
      return []
    },
    configurable: true,
  })
}
