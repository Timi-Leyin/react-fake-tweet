import React, { useState, useEffect } from 'react'
import processString from 'react-process-string'
import dayjs from 'dayjs'
import cs from 'classnames'

import Twemoji from './Twemoji'
import styles from './styles.module.css'

function styleNumber(num) {
  let div = num / 1000000
  if (div >= 1) {
    return (
      div.toFixed(1).replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/, '$1') + 'M'
    )
  }
  div = num / 1000
  if (div >= 1) {
    return (
      div.toFixed(1).replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/, '$1') + 'K'
    )
  }
  return num
}

function renderDate(date) {
  return dayjs(date).format('h:mm A · MMMM D, YYYY')
}

const verifiedIcon = (
  <div className={styles.icon}>
    <svg
      viewBox='0 0 24 24'
      aria-label='Verified account'
      className={styles['verified-icon-svg']}
    >
      <g>
        <path d='M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z' />
      </g>
    </svg>
  </div>
)

const lockIcon = (
  <div className={styles.icon}>
    <svg
      viewBox='0 0 24 24'
      aria-label='Locked account'
      className={styles['lock-icon-svg']}
    >
      <g>
        <path d='M19.75 7.31h-1.88c-.19-3.08-2.746-5.526-5.87-5.526S6.32 4.232 6.13 7.31H4.25C3.01 7.31 2 8.317 2 9.56v10.23c0 1.24 1.01 2.25 2.25 2.25h15.5c1.24 0 2.25-1.01 2.25-2.25V9.56c0-1.242-1.01-2.25-2.25-2.25zm-7 8.377v1.396c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-1.396c-.764-.3-1.307-1.04-1.307-1.91 0-1.137.92-2.058 2.057-2.058 1.136 0 2.057.92 2.057 2.056 0 .87-.543 1.61-1.307 1.91zM7.648 7.31C7.838 5.06 9.705 3.284 12 3.284s4.163 1.777 4.352 4.023H7.648z' />
      </g>
    </svg>
  </div>
)

const dropButtonIcon = (
  <div className={styles['drop-button']}>
    <svg viewBox='0 0 24 24'>
      <g>
        <path d='M20.207 8.147c-.39-.39-1.023-.39-1.414 0L12 14.94 5.207 8.147c-.39-.39-1.023-.39-1.414 0-.39.39-.39 1.023 0 1.414l7.5 7.5c.195.196.45.294.707.294s.512-.098.707-.293l7.5-7.5c.39-.39.39-1.022 0-1.413z' />
      </g>
    </svg>
  </div>
)

const commentAction = (
  <div className={cs(styles['bottom-button'], styles.blue)}>
    <div>
      <svg viewBox='0 0 24 24'>
        <g>
          <path d='M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z' />
        </g>
      </svg>
    </div>
  </div>
)

const retweetAction = (
  <div className={cs(styles['bottom-button'], styles.green)}>
    <div>
      <svg viewBox='0 0 24 24'>
        <g>
          <path d='M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z' />
        </g>
      </svg>
    </div>
  </div>
)

const favoriteAction = (
  <div className={cs(styles['bottom-button'], styles.red)}>
    <div>
      <svg viewBox='0 0 24 24'>
        <g>
          <path d='M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z' />
        </g>
      </svg>
    </div>
  </div>
)

const shareAction = (
  <div className={cs(styles['bottom-button'], styles.blue)}>
    <div>
      <svg viewBox='0 0 24 24'>
        <g>
          <path d='M17.53 7.47l-5-5c-.293-.293-.768-.293-1.06 0l-5 5c-.294.293-.294.768 0 1.06s.767.294 1.06 0l3.72-3.72V15c0 .414.336.75.75.75s.75-.336.75-.75V4.81l3.72 3.72c.146.147.338.22.53.22s.384-.072.53-.22c.293-.293.293-.767 0-1.06z' />
          <path d='M19.708 21.944H4.292C3.028 21.944 2 20.916 2 19.652V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 .437.355.792.792.792h15.416c.437 0 .792-.355.792-.792V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 1.264-1.028 2.292-2.292 2.292z' />
        </g>
      </svg>
    </div>
  </div>
)

export function Tweet(props) {
  const { config = {}, className, ...rest } = props
  const [text, setText] = useState(config.text)

  useEffect(() => {
    setText(
      processString([
        {
          regex: /(?:^|[^a-zA-Z0-9_＠!@#$%&*])(?:(?:@|＠)(?!\/))([a-zA-Z0-9/_]{1,15})(?:\b(?!@|＠)|$)/,
          fn: (key, result) => {
            return (
              <span key={key}>
                {' '}
                <span className={cs(styles.link, styles.mention)}>
                  @{result[1]}
                </span>
              </span>
            )
          }
        },
        {
          regex: /(?:^|[^a-zA-Z0-9_＠!@#$%&*])(?:#(?!\/))([a-zA-Z0-9/_]{1,280})(?:\b(?!#)|$)/,
          fn: (key, result) => {
            return (
              <span key={key}>
                {' '}
                <span className={cs(styles.link, styles.mention)}>
                  #{result[1]}
                </span>
              </span>
            )
          }
        },
        {
          regex: /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/,
          fn: (key, result) => {
            return (
              <Twemoji
                key={key}
                options={{ className: styles['twemoji-bg'] }}
                style={{ display: 'inline' }}
              >
                {result[1]}
              </Twemoji>
            )
          }
        }
      ])(config.text)
    )
  }, [config.text])

  const theme = ['default', 'dim', 'lightsout'].includes(config.theme)
    ? config.theme
    : 'default'

  const dateAppDetails = [
    config.date && renderDate(config.date),
    config.app && (
      <span key='app' className={cs(styles.link, styles.app)}>
        {config.app}
      </span>
    )
  ].filter(Boolean)

  return (
    <div className={cs(styles.tweet, styles[theme], className)} {...rest}>
      <div className={styles['user-info']}>
        <div className={styles['avatar-container']}>
          <img
            className={styles.avatar}
            src={config.user.avatar}
            alt={config.user.name}
          />
        </div>

        <div className={styles['user-info-right']}>
          {dropButtonIcon}

          <div className={styles['user-name']}>
            <Twemoji
              options={{ className: styles['twemoji-sm'] }}
              className={styles['user-name-txt']}
            >
              <span className={styles.link}>{config.user.name}</span>
            </Twemoji>

            {config.user.verified && verifiedIcon}

            {config.user.locked && !config.user.verified && lockIcon}
          </div>

          <div className={styles['user-nickname']}>@{config.user.nickname}</div>
        </div>
      </div>

      <div className={styles['tweet-text']}>
        {text && <div className={styles.txt}>{text}</div>}

        {config.image && (
          <div className={styles['image-container']}>
            <img src={config.image} alt='Tweet image' />
          </div>
        )}
      </div>

      {dateAppDetails && dateAppDetails.length && (
        <div className={styles['date-app-details']}>
          {dateAppDetails.map((d, i) => (
            <React.Fragment key={i}>
              {d}
              {i < dateAppDetails.length - 1 && ' · '}
            </React.Fragment>
          ))}
        </div>
      )}

      <div className={styles['rt-likes']}>
        <span className={cs(styles.link, styles['num-rts'])}>
          <strong>{styleNumber(config.retweets)}</strong> Retweets
        </span>

        <span className={cs(styles.link, styles['num-likes'])}>
          <strong>{styleNumber(config.likes)}</strong> Likes
        </span>
      </div>

      <div className={styles['bottom-buttons']}>
        {commentAction}

        {retweetAction}

        {favoriteAction}

        {shareAction}
      </div>
    </div>
  )
}
