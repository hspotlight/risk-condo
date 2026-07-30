import { useMemo } from 'react'
import ClearIcon from '@mui/icons-material/Clear'
import SearchIcon from '@mui/icons-material/Search'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import { useI18n } from '../i18n/context'
import { districtOptionLabel } from '../utils/maps'

interface FilterBarProps {
  query: string
  onQueryChange: (value: string) => void
  district: string
  onDistrictChange: (value: string) => void
  districts: string[]
}

export default function FilterBar({
  query,
  onQueryChange,
  district,
  onDistrictChange,
  districts,
}: FilterBarProps) {
  const { lang, t } = useI18n()

  // Alphabetical in whichever language is on screen, not in the data's order.
  const sortedDistricts = useMemo(
    () =>
      [...districts].sort((a, b) =>
        districtOptionLabel(a, lang).localeCompare(districtOptionLabel(b, lang), lang),
      ),
    [districts, lang],
  )

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1.5,
        flexWrap: 'wrap',
        alignItems: 'center',
        px: 2,
        py: 1.5,
      }}
    >
      <TextField
        size="small"
        fullWidth
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder={t.searchPlaceholder}
        aria-label={t.searchAriaLabel}
        sx={{ flex: '1 1 220px' }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
            endAdornment: query ? (
              <InputAdornment position="end">
                <IconButton size="small" aria-label={t.clearSearch} onClick={() => onQueryChange('')}>
                  <ClearIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ) : null,
          },
        }}
      />
      <FormControl size="small" sx={{ flex: '0 1 190px', minWidth: 150 }}>
        <InputLabel id="district-filter-label">{t.districtLabel}</InputLabel>
        <Select
          labelId="district-filter-label"
          label={t.districtLabel}
          value={district}
          onChange={(event) => onDistrictChange(event.target.value)}
        >
          <MenuItem value="">{t.allDistricts}</MenuItem>
          {sortedDistricts.map((name) => (
            <MenuItem key={name} value={name}>
              {districtOptionLabel(name, lang)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}
