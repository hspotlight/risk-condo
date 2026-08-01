import { useMemo, useState } from 'react'
import MapIcon from '@mui/icons-material/Map'
import TableRowsIcon from '@mui/icons-material/TableRows'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { ThemeProvider } from '@mui/material/styles'
import CondoMap from './components/CondoMap'
import CondoTable from './components/CondoTable'
import FilterBar from './components/FilterBar'
import LanguageSwitch from './components/LanguageSwitch'
import WhyItMatters from './components/WhyItMatters'
import { condos, districts } from './data/condos'
import { useI18n } from './i18n/context'
import LanguageProvider from './i18n/LanguageProvider'
import { theme } from './theme'
import type { SortDir, SortKey } from './types'
import { matchesQuery, sortValue } from './utils/maps'

type MobileView = 'table' | 'map'

function CondoExplorer() {
  const { lang, t } = useI18n()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

  const [query, setQuery] = useState('')
  const [district, setDistrict] = useState('')
  const [orderBy, setOrderBy] = useState<SortKey>('id')
  const [order, setOrder] = useState<SortDir>('asc')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [mobileView, setMobileView] = useState<MobileView>('table')

  const filtered = useMemo(
    () =>
      condos.filter(
        (condo) => matchesQuery(condo, query) && (!district || condo.district === district),
      ),
    [query, district],
  )

  // Names and place labels sort under the collation of the language on screen.
  const sorted = useMemo(() => {
    const factor = order === 'asc' ? 1 : -1
    return [...filtered].sort((a, b) => {
      const left = sortValue(a, orderBy, lang)
      const right = sortValue(b, orderBy, lang)
      if (typeof left === 'number' && typeof right === 'number') return (left - right) * factor
      return String(left).localeCompare(String(right), lang) * factor
    })
  }, [filtered, orderBy, order, lang])

  const paged = useMemo(
    () => sorted.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [sorted, page, rowsPerPage],
  )

  const handleSort = (key: SortKey) => {
    if (key === orderBy) {
      setOrder((current) => (current === 'asc' ? 'desc' : 'asc'))
    } else {
      setOrderBy(key)
      setOrder('asc')
    }
    setPage(0)
  }

  const handleQueryChange = (value: string) => {
    setQuery(value)
    setPage(0)
  }

  const handleDistrictChange = (value: string) => {
    setDistrict(value)
    setPage(0)
  }

  /**
   * Row tap: highlight only, so the list stays browsable on mobile. A selection
   * coming from a map pin may live on another page, so page to it.
   */
  const handleSelect = (id: number) => {
    setSelectedId(id)
    const index = sorted.findIndex((condo) => condo.id === id)
    if (index !== -1) setPage(Math.floor(index / rowsPerPage))
  }

  /** Pin button or map pin: highlight and make sure the map is on screen. */
  const handleShowOnMap = (id: number) => {
    handleSelect(id)
    if (!isDesktop) setMobileView('map')
  }

  const tablePane = (
    <Paper
      elevation={0}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minHeight: 0,
        borderRight: { md: 1 },
        borderColor: { md: 'divider' },
        borderRadius: 0,
      }}
    >
      <FilterBar
        query={query}
        onQueryChange={handleQueryChange}
        district={district}
        onDistrictChange={handleDistrictChange}
        districts={districts}
      />
      <CondoTable
        rows={paged}
        total={sorted.length}
        orderBy={orderBy}
        order={order}
        onSort={handleSort}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={setPage}
        onRowsPerPageChange={(value) => {
          setRowsPerPage(value)
          setPage(0)
        }}
        selectedId={selectedId}
        onSelect={handleSelect}
        onShowOnMap={handleShowOnMap}
      />
    </Paper>
  )

  const mapPane = (
    <CondoMap
      condos={filtered}
      selectedId={selectedId}
      onSelect={handleShowOnMap}
      active={isDesktop || mobileView === 'map'}
    />
  )

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box
        component="header"
        sx={{
          px: 2,
          py: 1.5,
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'flex-start',
          gap: 1.5,
        }}
      >
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography
            variant="h1"
            component="h1"
            sx={{ fontSize: { xs: '1.05rem', md: '1.35rem' } }}
          >
            {t.appTitle}
          </Typography>
          <Typography
            variant="body2"
            sx={{ opacity: 0.9, mt: 0.5, display: { xs: 'none', md: 'block' } }}
          >
            {t.appSubtitle}
          </Typography>
        </Box>
        <LanguageSwitch />
      </Box>

      <WhyItMatters />

      <Alert severity="warning" sx={{ borderRadius: 0, flexShrink: 0, py: 0.25 }}>
        <Typography variant="caption" sx={{ display: { xs: 'none', md: 'block' } }}>
          {t.caveatFull({ approx: t.caveatApprox })}
        </Typography>
        <Typography variant="caption" sx={{ display: { xs: 'block', md: 'none' } }}>
          {t.caveatShort({ approx: t.caveatApprox })}
        </Typography>
      </Alert>

      {isDesktop ? (
        <Box
          sx={{
            flex: 1,
            minHeight: 0,
            display: 'grid',
            gridTemplateColumns: 'minmax(480px, 46%) 1fr',
          }}
        >
          {tablePane}
          {mapPane}
        </Box>
      ) : (
        <Box sx={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
          <Tabs
            value={mobileView}
            onChange={(_, value: MobileView) => setMobileView(value)}
            variant="fullWidth"
            sx={{ borderBottom: 1, borderColor: 'divider', flexShrink: 0 }}
          >
            <Tab value="table" icon={<TableRowsIcon />} iconPosition="start" label={t.tabTable} />
            <Tab value="map" icon={<MapIcon />} iconPosition="start" label={t.tabMap} />
          </Tabs>
          <Box sx={{ flex: 1, minHeight: 0, display: mobileView === 'table' ? 'block' : 'none' }}>
            {tablePane}
          </Box>
          <Box sx={{ flex: 1, minHeight: 0, display: mobileView === 'map' ? 'block' : 'none' }}>
            {mapPane}
          </Box>
        </Box>
      )}

      <Box
        component="footer"
        sx={{
          px: 2,
          py: 1,
          borderTop: 1,
          borderColor: 'divider',
          flexShrink: 0,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1.5,
          alignItems: 'center',
          bgcolor: 'background.paper',
        }}
      >
        <Typography variant="caption" color="text.secondary">
          <Link
            href="https://www.facebook.com/HSpotlight"
            target="_blank"
            rel="noreferrer noopener"
            underline="hover"
          >
            {t.footerCraftedBy}
          </Link>
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ mx: 0.5 }}>
          ·
        </Typography>
        <Typography variant="caption" color="text.secondary">
          <Link
            href="https://github.com/hspotlight/risk-condo"
            target="_blank"
            rel="noreferrer noopener"
            underline="hover"
          >
            {t.footerContribute}
          </Link>
        </Typography>
      </Box>
    </Box>
  )
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LanguageProvider>
        <CondoExplorer />
      </LanguageProvider>
    </ThemeProvider>
  )
}
