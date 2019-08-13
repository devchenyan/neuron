import React, { useState, useCallback, useMemo } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Stack, DefaultButton, PrimaryButton, TextField } from 'office-ui-fabric-react'
import { useTranslation } from 'react-i18next'
import { showOpenDialog } from 'services/remote'
import { importWalletWithKeystore } from 'states/stateProvider/actionCreators'
import { StateWithDispatch } from 'states/stateProvider/reducer'
import { useGoBack } from 'utils/hooks'

const defaultFields = {
  path: '',
  name: '',
  password: '',
}

const ImportKeystore = (props: React.PropsWithoutRef<StateWithDispatch & RouteComponentProps>) => {
  const [t] = useTranslation()
  const {
    history,
    dispatch,
    settings: { wallets },
  } = props
  const [fields, setFields] = useState(defaultFields)
  const goBack = useGoBack(history)

  const exsitingNames = useMemo(() => {
    return wallets.map(w => w.name)
  }, [wallets])

  const onFileClick = useCallback(() => {
    showOpenDialog({
      title: 'import keystore',
      onUpload: (filePaths: string[]) => {
        if (!filePaths || filePaths.length === 0) {
          return
        }
        const filePath = filePaths[0]
        const filename = filePath.split('/').pop() || 'Imported wallet'
        setFields({
          ...fields,
          path: filePath,
          name: filename,
        })
      },
    })
  }, [fields])

  const onSubmit = useCallback(() => {
    importWalletWithKeystore({
      name: fields.name,
      keystorePath: fields.path,
      password: fields.password,
    })(dispatch, history)
  }, [fields.name, fields.password, fields.path, history, dispatch])

  return (
    <Stack verticalFill verticalAlign="center" tokens={{ childrenGap: 15 }}>
      <Stack tokens={{ childrenGap: 15 }}>
        {Object.entries(fields).map(([key, value]) => {
          return (
            <TextField
              key={key}
              onClick={key === 'path' ? onFileClick : undefined}
              label={t(`import-keystore.label.${key}`)}
              placeholder={t(`import-keystore.placeholder.${key}`)}
              type={key === 'password' ? 'password' : 'text'}
              readOnly={key === 'path'}
              value={value}
              validateOnLoad={false}
              onGetErrorMessage={(text?: string) => {
                if (text === '') {
                  return t('messages.is-required', { field: t(`import-keystore.label.${key}`) })
                }
                if (key === 'name' && exsitingNames.includes(text || '')) {
                  return t('messages.is-used', { field: t(`import-keystore.label.${key}`) })
                }
                return ''
              }}
              onChange={(_e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
                if (newValue !== undefined) {
                  setFields({
                    ...fields,
                    [key]: newValue,
                  })
                }
              }}
            />
          )
        })}
      </Stack>
      <Stack horizontal horizontalAlign="end" tokens={{ childrenGap: 15 }}>
        <DefaultButton onClick={goBack}>{t('import-keystore.button.back')}</DefaultButton>
        <PrimaryButton disabled={!(fields.name && fields.path && fields.password)} onClick={onSubmit}>
          {t('import-keystore.button.submit')}
        </PrimaryButton>
      </Stack>
    </Stack>
  )
}

ImportKeystore.displayName = 'ImportKeystore'
export default ImportKeystore
