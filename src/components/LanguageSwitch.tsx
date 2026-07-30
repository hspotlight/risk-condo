import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import { useI18n } from '../i18n/context'
import type { Lang } from '../i18n/strings'

export default function LanguageSwitch() {
  const { lang, setLang, t } = useI18n()

  return (
    <ToggleButtonGroup
      size="small"
      exclusive
      value={lang}
      aria-label={t.langLabel}
      onChange={(_, next: Lang | null) => {
        if (next) setLang(next)
      }}
      sx={{
        flexShrink: 0,
        bgcolor: 'rgba(255,255,255,0.14)',
        '& .MuiToggleButton-root': {
          color: 'primary.contrastText',
          borderColor: 'rgba(255,255,255,0.5)',
          px: 1.25,
          py: 0.25,
          fontSize: '0.75rem',
          textTransform: 'none',
        },
        '& .MuiToggleButton-root.Mui-selected': {
          bgcolor: 'primary.contrastText',
          color: 'primary.main',
          fontWeight: 700,
          '&:hover': { bgcolor: 'primary.contrastText' },
        },
      }}
    >
      <ToggleButton value="th" aria-label="ภาษาไทย">
        ไทย
      </ToggleButton>
      <ToggleButton value="en" aria-label="English">
        EN
      </ToggleButton>
    </ToggleButtonGroup>
  )
}
