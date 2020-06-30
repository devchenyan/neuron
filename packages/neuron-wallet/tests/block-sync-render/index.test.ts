import { LumosCellQuery } from "../../src/block-sync-renderer/sync/indexer-connector"

const stubbedElectronBrowserOn = jest.fn()
const stubbedElectronBrowserLoadURL = jest.fn()
const stubbedElectronBrowserWebContentSend = jest.fn()

const stubbedIpcMainOnce = jest.fn()

const stubbedElectronBrowserConstructor = jest.fn().mockImplementation(
  () => ({
    on: stubbedElectronBrowserOn,
    loadURL: stubbedElectronBrowserLoadURL,
    webContents: {
      send: stubbedElectronBrowserWebContentSend
    }
  })
)

const resetMocks = () => {
  stubbedElectronBrowserOn.mockReset()
  stubbedElectronBrowserLoadURL.mockReset()
  stubbedElectronBrowserWebContentSend.mockReset()

  stubbedIpcMainOnce.mockReset()
}

describe('block sync render', () => {
  let queryIndexer: any
  let createBlockSyncTask: any

  beforeEach(async () => {
    resetMocks()
    jest.useFakeTimers()

    jest.doMock('electron', () => {
      return {
        BrowserWindow: stubbedElectronBrowserConstructor,
        ipcMain: {
          once: stubbedIpcMainOnce
        }
      }
    });

    queryIndexer = require('../../src/block-sync-renderer').queryIndexer
    createBlockSyncTask = require('../../src/block-sync-renderer').createBlockSyncTask
  });
  afterEach(() => {
    jest.clearAllTimers()
  });
  describe('after initialized BrowserWindow', () => {
    beforeEach(() => {
      createBlockSyncTask()
      jest.advanceTimersByTime(2000)
    });
    describe('#queryIndexer', () => {
      const query: LumosCellQuery = {lock: null, type: null, data: null}
      beforeEach(() => {
        queryIndexer(query)
      });
      it('listens on ipcMain#once', () => {
        expect(stubbedIpcMainOnce.mock.calls[0][0]).toEqual('block-sync:query-indexer:1')
        expect(stubbedElectronBrowserWebContentSend).toHaveBeenCalledWith('block-sync:query-indexer', query, 1)
      })
      describe('in subsequent #queryIndexer calls', () => {
        beforeEach(() => {
          queryIndexer(query)
        });
        it('updates indexer query id', () => {
          expect(stubbedIpcMainOnce.mock.calls[0][0]).toEqual('block-sync:query-indexer:2')
        })
      });
    });
  });
});
