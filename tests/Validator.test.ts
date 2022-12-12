import { resolve } from 'path';
// eslint-disable-next-line import/no-extraneous-dependencies
import { expect, jest, describe, it, beforeAll, afterAll } from '@jest/globals';
import { validateFile } from '../src/Validator';
import { Logger } from '../src/Logger';

describe('when validating that XML file is well-formed', () => {
  describe.each([['valid-without-prolog.xml', 'valid-with-prolog.xml']])(
    'given a well-formed file',
    (fileName) => {
      let mockErrorSpy: any;
      let mockInfoSpy: any;
      let mockFatalSpy: any;

      beforeAll(() => {
        mockErrorSpy = jest.spyOn(Logger, 'error');
        mockErrorSpy.mockImplementation(() => {});
        mockFatalSpy = jest.spyOn(Logger, 'fatal');
        mockFatalSpy.mockImplementation(() => {});
        mockInfoSpy = jest.spyOn(Logger, 'info');
        mockInfoSpy.mockImplementation(() => {});

        const xmlFile = resolve(__dirname, 'files', fileName);
        validateFile(xmlFile);
      });

      afterAll(() => {
        jest.restoreAllMocks();
      });

      it('does not report any (regular) errors', () => {
        expect(mockErrorSpy).not.toHaveBeenCalled();
      });

      it('does not report any fatal errors', () => {
        expect(mockFatalSpy).not.toHaveBeenCalled();
      });

      it('logs to the info console', () => {
        expect(mockInfoSpy).toHaveBeenCalled();
      });
    },
  );

  describe.each([['bad-prolog.xml', 'unclosed-child', 'unclosed-root']])(
    'given a problematic file',
    (fileName) => {
      let mockErrorSpy: any;
      let mockInfoSpy: any;
      let mockFatalSpy: any;

      beforeAll(() => {
        mockErrorSpy = jest.spyOn(Logger, 'error');
        mockErrorSpy.mockImplementation(() => {});
        mockFatalSpy = jest.spyOn(Logger, 'fatal');
        mockFatalSpy.mockImplementation(() => {});
        mockInfoSpy = jest.spyOn(Logger, 'info');
        mockInfoSpy.mockImplementation(() => {});

        const xmlFile = resolve(__dirname, 'files', fileName);
        validateFile(xmlFile);
      });

      afterAll(() => {
        jest.restoreAllMocks();
      });

      it('does not report any (regular) errors', () => {
        expect(mockErrorSpy).not.toHaveBeenCalled();
      });

      it('does report a fatal error', () => {
        expect(mockFatalSpy).toHaveBeenCalled();
      });

      it('logs to the info console', () => {
        expect(mockInfoSpy).not.toHaveBeenCalled();
      });
    },
  );
});

describe('when validating XML file against its schema', () => {
  describe.each([['valid-without-prolog.xml', 'valid-with-prolog.xml']])(
    'given a well-formed file',
    (fileName) => {
      let mockErrorSpy: any;
      let mockInfoSpy: any;
      let mockFatalSpy: any;

      beforeAll(() => {
        mockErrorSpy = jest.spyOn(Logger, 'error');
        mockErrorSpy.mockImplementation(() => {});
        mockFatalSpy = jest.spyOn(Logger, 'fatal');
        mockFatalSpy.mockImplementation(() => {});
        mockInfoSpy = jest.spyOn(Logger, 'info');
        mockInfoSpy.mockImplementation(() => {});

        const xmlFile = resolve(__dirname, 'files', fileName);
        const xsdFile = resolve(__dirname, 'files', 'sport.xsd');
        validateFile(xmlFile, xsdFile);
      });

      afterAll(() => {
        jest.restoreAllMocks();
      });

      it('does not report any (regular) errors', () => {
        expect(mockErrorSpy).not.toHaveBeenCalled();
      });

      it('does not report any fatal errors', () => {
        expect(mockFatalSpy).not.toHaveBeenCalled();
      });

      it('logs to the info console', () => {
        expect(mockInfoSpy).toHaveBeenCalled();
      });
    },
  );

  describe.each([['bad-child-element.xml', 'wrong-root-element.xml']])(
    'given a non-conforming file',
    (fileName) => {
      let mockErrorSpy: any;
      let mockInfoSpy: any;
      let mockFatalSpy: any;

      beforeAll(() => {
        mockErrorSpy = jest.spyOn(Logger, 'error');
        mockErrorSpy.mockImplementation(() => {});
        mockFatalSpy = jest.spyOn(Logger, 'fatal');
        mockFatalSpy.mockImplementation(() => {});
        mockInfoSpy = jest.spyOn(Logger, 'info');
        mockInfoSpy.mockImplementation(() => {});

        const xmlFile = resolve(__dirname, 'files', fileName);
        const xsdFile = resolve(__dirname, 'files', 'sport.xsd');
        validateFile(xmlFile, xsdFile);
      });

      afterAll(() => {
        jest.restoreAllMocks();
      });

      it('does not report any (regular) errors', () => {
        expect(mockErrorSpy).not.toHaveBeenCalled();
      });

      it('does report a fatal error', () => {
        expect(mockFatalSpy).toHaveBeenCalled();
      });

      it('logs to the info console', () => {
        expect(mockInfoSpy).toHaveBeenCalled();
      });
    },
  );
});
