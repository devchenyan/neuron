import React, { useEffect, useRef, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Dialog from 'widgets/Dialog'
import jsQR from 'jsqr'

import styles from './cameraScanDialog.module.scss'

const IMAGE_SIZE = 400

export interface Point {
  x: number
  y: number
}

const CameraScanDialog = ({ close, onConfirm }: { close: () => void; onConfirm: (result: string) => void }) => {
  const [t] = useTranslation()
  const videoRef = useRef<HTMLVideoElement>()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvas2dRef = useRef<CanvasRenderingContext2D>()
  const [loading, setLoading] = useState(true)

  const drawLine = (begin: Point, end: Point) => {
    if (!canvas2dRef.current) return
    canvas2dRef.current.beginPath()
    canvas2dRef.current.moveTo(begin.x, begin.y)
    canvas2dRef.current.lineTo(end.x, end.y)
    canvas2dRef.current.lineWidth = 4
    canvas2dRef.current.strokeStyle = '#00c891'
    canvas2dRef.current.stroke()
  }

  const scan = useCallback(() => {
    if (videoRef.current?.readyState === HTMLMediaElement.HAVE_ENOUGH_DATA) {
      setLoading(false)
      const canvas2d = canvasRef.current?.getContext('2d')
      if (canvas2d) {
        canvas2d.drawImage(videoRef.current, 0, 0, IMAGE_SIZE, IMAGE_SIZE)
        canvas2dRef.current = canvas2d
        const imageData = canvas2d.getImageData(0, 0, IMAGE_SIZE, IMAGE_SIZE)
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: 'dontInvert',
        })
        if (code) {
          drawLine(code.location.topLeftCorner, code.location.topRightCorner)
          drawLine(code.location.topRightCorner, code.location.bottomRightCorner)
          drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner)
          drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner)
          onConfirm(code.data)
        }
      }
    }
    requestAnimationFrame(scan)
  }, [])

  useEffect(() => {
    let mediaStream: MediaStream
    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: { width: IMAGE_SIZE, height: IMAGE_SIZE },
      })
      .then(res => {
        if (res) {
          videoRef.current = document.createElement('video')
          videoRef.current.srcObject = res
          videoRef.current.play()
          mediaStream = res
          requestAnimationFrame(scan)
        }
      })

    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => {
          track.stop()
        })
      }
    }
  }, [])

  return (
    <Dialog
      show
      title={t('wallet-connect.scan-with-camera')}
      onCancel={close}
      showCancel={false}
      showConfirm={false}
      showFooter={false}
    >
      <div className={styles.container}>
        <div className={styles.scanBox}>
          {loading ? (
            <div>{t('wallet-connect.waiting-camera')}</div>
          ) : (
            <canvas ref={canvasRef} width="400px" height="400px" />
          )}
        </div>
      </div>
    </Dialog>
  )
}

CameraScanDialog.displayName = 'CameraScanDialog'
export default CameraScanDialog
