export default {
  translation: {
    mainmenu: {
      neuron: {
        about: 'About {{app}}',
        preferences: 'Preferences...',
        quit: 'Quit {{app}}',
      },
      edit: {
        label: 'Edit',
        cut: 'Cut',
        copy: 'Copy',
        paste: 'Paste',
      },
      view: {
        label: 'View',
        fullscreen: 'Fullscreen',
      },
      window: {
        label: 'Window',
        minimize: 'Minimize',
        close: 'Close Window',
      },
      help: {
        label: 'Help',
        sourceCode: 'Source Code',
      },
      develop: {
        terminal: 'Terminal',
        develop: 'Develop',
        forceReload: 'Force Reload',
        reload: 'Reload',
        toggleDevTools: 'Toggle DevTools',
      },
    },
    services: {
      transactions: 'Transactions',
      wallets: 'Wallets',
    },
    messages: {
      'failed-to-load-networks': 'Failed to load networks',
      'Networks-will-be-reset': 'Networks will be reset',
      'wallet-password-less-than-min-length': 'Password must be at least {{minPasswordLength}} characters',
      'wallet-password-more-than-max-length': 'Password up to {{maxPasswordLength}} characters',
      'wallet-password-letter-complexity':
        'Password must contain a combination of uppercase and lowercase letters, numbers and special symbols.',
      'current-wallet-is-not-found': 'Current wallet is not found',
      'password-is-required': 'Password is required',
      'password-is-incorrect': 'Password is incorrect',
      'current-key-has-no-data': 'Current Key has no data',
      'address-is-invalid': 'Address {{address}} is invalid',
      'codehash-is-not-loaded': 'codehash is not loaded',
      'wallet-is-not-found': 'Wallet {{id}} not found',
      'no-active-wallet': 'No active wallet',
      'wallet-incorrect-password': 'Incorrect password',
      'failed-to-create-mnemonic': 'Failed to create mnemonic',
      'failed-to-activate-wallet': 'Failed to activate wallet',
      'failed-to-delete-wallet': 'Failed to delete wallet',
      'wallet-name-is-used': 'A wallet with name {{name}} already exists',
      'network-of-id-is-not-found': 'Network of id {{id}} is not found',
      'id-is-required': 'ID is required',
      'name-and-remote-address-are-required': 'Name and remote address are required',
      'invalid-name': 'Name is invalid',
      'default-network-is-unremovable': 'Default network is unremovable',
      'cannot-delete-active-network-due-to-lack-of-default-one':
        'Cannot delete active network due to lack of default one',
      'active-network-is-not-set': 'Active network is not set',
      'transaction-is-not-found': 'Transaction {{hash}} is not found',
      'service-not-responds': '{{service}} service not respond',
      'name-is-required': 'Name is required',
      'mnemonic-is-required': 'Mnemonic is required',
      'keystore-is-required': '-eystore is required',
      'parameters-of-sending-transactions-are-required': 'Parameters of sending transactions are required',
      'is-required': '{{field}} is required',
      'invalid-format': '{{field}} is in invalid format',
      'network-name-is-used': 'Network name is used',
      'missing-required-argument': 'Missing required argument',
    },
    contextMenu: {
      select: 'Select',
      backup: 'Backup',
      edit: 'Edit',
      delete: 'Delete',
      'copy-address': 'Copy address',
      'request-payment': 'Request Payment',
      'spend-from': 'Spend From',
      'view-on-explorer': 'View On Explorer',
    },
    messageBox: {
      button: {
        confirm: 'OK',
        discard: 'Cancel',
      },
      'remove-network': {
        title: 'Remove Network',
        message: 'Network of name: {{name}}, address: {{address}} will be removed.',
        alert: 'This is the current network, by removing it, the connection will be switched to the default network',
      },
      'remove-wallet': {
        title: 'Delete the wallet',
        password: 'Password',
      },
    },
  },
}
