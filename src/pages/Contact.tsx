import { useState } from 'react'
import type { FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { LINKS } from '../links'
import { WEB3FORMS_ACCESS_KEY } from '../config'
import './contact.css'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function Contact() {
  const { t } = useTranslation()
  const [status, setStatus] = useState<Status>('idle')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    if (data.get('botcheck')) return
    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: 'New message via dataaigency.com',
          name: data.get('name'),
          email: data.get('email'),
          message: data.get('message'),
        }),
      })
      const json = await res.json()
      if (json.success) {
        setStatus('sent')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="container" style={{ padding: '64px 24px' }}>
      <div style={{ maxWidth: 680 }}>
        <h1 style={{ fontSize: 'clamp(30px, 5vw, 44px)' }}>{t('contact.title')}</h1>
        <p style={{ marginTop: 20, color: 'var(--graphite)' }}>{t('contact.sub')}</p>
        <p style={{ marginTop: 24, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <a className="btn btn--primary" href={LINKS.booking}>{t('contact.book')}</a>
          <a className="btn btn--secondary" href={LINKS.linkedin}>{t('contact.linkedin')}</a>
          <a className="btn btn--secondary" href={LINKS.github}>{t('contact.github')}</a>
        </p>

        <h2 style={{ fontSize: 22, marginTop: 48 }}>{t('contact.form.title')}</h2>
        <form className="cform" onSubmit={onSubmit}>
          <input className="cform__hp" type="text" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <label>
            {t('contact.form.name')}
            <input type="text" name="name" required maxLength={120} autoComplete="name" />
          </label>
          <label>
            {t('contact.form.email')}
            <input type="email" name="email" required maxLength={200} autoComplete="email" />
          </label>
          <label>
            {t('contact.form.message')}
            <textarea name="message" required maxLength={4000} />
          </label>
          <div>
            <button className="btn btn--primary" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? t('contact.form.sending') : t('contact.form.send')}
            </button>
          </div>
          {status === 'sent' && <p className="cform__status cform__status--ok" role="status">{t('contact.form.success')}</p>}
          {status === 'error' && <p className="cform__status cform__status--err" role="alert">{t('contact.form.error')}</p>}
        </form>
      </div>
    </section>
  )
}
