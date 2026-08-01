import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Collapse from '@mui/material/Collapse'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { references } from '../data/references'
import { useI18n } from '../i18n/context'
import { theme } from '../theme'

export default function WhyItMatters() {
  const { lang, t } = useI18n()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
  const [open, setOpen] = useState(false)

  const content = (
    <>
      {t.whyParagraphs.map((paragraph) => (
        <Typography key={paragraph.slice(0, 24)} variant="body2" sx={{ mb: 1.25 }}>
          {paragraph}
        </Typography>
      ))}

      <Typography variant="subtitle2" sx={{ fontWeight: 700, mt: 1.5 }}>
        {t.whyLawHeading}
      </Typography>
      <Typography variant="body2">{t.whyLawBody}</Typography>

      <Typography variant="subtitle2" sx={{ fontWeight: 700, mt: 1.5 }}>
        {t.whyStatusHeading}
      </Typography>
      <Typography variant="body2">{t.whyStatusBody}</Typography>

      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1.5 }}>
        {t.whyDisclaimer}
      </Typography>

      <Divider sx={{ my: 1.5 }} />

      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
        {t.referencesHeading}
      </Typography>
      <Box component="ul" sx={{ pl: 2.5, m: 0, mt: 0.5 }}>
        {references.map((reference) => {
          const title = lang === 'th' ? reference.titleTh : reference.titleEn
          const publisher = lang === 'th' ? reference.publisherTh : reference.publisherEn
          const date = lang === 'th' ? reference.dateTh : reference.dateEn
          return (
            <Box component="li" key={reference.url ?? reference.titleEn} sx={{ mb: 0.75 }}>
              {reference.url ? (
                <Link
                  href={reference.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  variant="body2"
                  sx={{ fontWeight: 600 }}
                >
                  {title}
                  <OpenInNewIcon sx={{ fontSize: 13, ml: 0.5, verticalAlign: 'middle' }} />
                </Link>
              ) : (
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {title}
                </Typography>
              )}
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                {publisher}
                {date ? ` · ${date}` : ''}
              </Typography>
            </Box>
          )
        })}
      </Box>
      <Typography variant="caption" color="text.secondary">
        {t.referencesNote}
      </Typography>
    </>
  )

  return (
    <Box
      component="section"
      aria-label={t.whyHeading}
      sx={{ bgcolor: '#fff8e1', borderBottom: 1, borderColor: 'divider', flexShrink: 0 }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          px: 2,
          py: { xs: 0.25, md: 0.75 },
          flexWrap: 'nowrap',
        }}
      >
        <LocalFireDepartmentIcon fontSize="small" sx={{ color: 'primary.main', flexShrink: 0 }} />
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            flex: '1 1 0',
            minWidth: 0,
            fontSize: { xs: '0.8rem', md: '0.875rem' },
            display: { xs: 'none', md: 'block' },
          }}
        >
          {t.whyHook}
        </Typography>
        <Box sx={{ flex: { xs: 1, md: 'none' } }} />
        <Button
          size="small"
          onClick={() => setOpen((current) => !current)}
          endIcon={isDesktop && open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          aria-expanded={open}
          sx={{ textTransform: 'none', flexShrink: 0 }}
        >
          {isDesktop && open ? t.whyCollapse : t.whyExpand}
        </Button>
      </Box>

      {/* Desktop: inline panel, capped and internally scrollable so expanding
          never squeezes the table and map off screen. */}
      {isDesktop ? (
        <Collapse in={open} unmountOnExit>
          <Box sx={{ px: 2, pb: 2, maxWidth: 900, maxHeight: '38vh', overflowY: 'auto' }}>
            {content}
          </Box>
        </Collapse>
      ) : (
        // Mobile: a full-screen sheet — there is no room to read this beside the list.
        <Dialog fullScreen open={open} onClose={() => setOpen(false)}>
          <DialogTitle
            sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, pr: 1, fontSize: '1.05rem' }}
          >
            <Box sx={{ flex: 1, minWidth: 0 }}>{t.whyHeading}</Box>
            <IconButton aria-label={t.whyCollapse} onClick={() => setOpen(false)} sx={{ mt: -0.5 }}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>{content}</DialogContent>
        </Dialog>
      )}
    </Box>
  )
}
