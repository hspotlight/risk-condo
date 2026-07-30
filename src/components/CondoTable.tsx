import { useEffect, useRef } from 'react'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import PlaceIcon from '@mui/icons-material/Place'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { useI18n } from '../i18n/context'
import type { Strings } from '../i18n/strings'
import type { Condo, SortDir, SortKey } from '../types'
import {
  districtLabel,
  googleMapsUrl,
  nearestLabel,
  primaryName,
  secondaryName,
} from '../utils/maps'

interface Column {
  key: SortKey
  label: (t: Strings) => string
  /** Dropped below lg: the split pane is too narrow to carry it without
      wrapping the project name. The value stays searchable and appears in the
      map popup either way. */
  hideOnNarrow?: boolean
}

const columns: Column[] = [
  { key: 'id', label: (t) => t.colNumber },
  { key: 'name', label: (t) => t.colName },
  { key: 'district', label: (t) => t.colDistrict },
  { key: 'nearest', label: (t) => t.colNearest, hideOnNarrow: true },
]

interface CondoTableProps {
  rows: Condo[]
  total: number
  orderBy: SortKey
  order: SortDir
  onSort: (key: SortKey) => void
  page: number
  rowsPerPage: number
  onPageChange: (page: number) => void
  onRowsPerPageChange: (rowsPerPage: number) => void
  selectedId: number | null
  /** Row tap — highlight without stealing the viewport on mobile. */
  onSelect: (id: number) => void
  /** Pin button — highlight and bring the map into view. */
  onShowOnMap: (id: number) => void
}

export default function CondoTable({
  rows,
  total,
  orderBy,
  order,
  onSort,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  selectedId,
  onSelect,
  onShowOnMap,
}: CondoTableProps) {
  const { lang, t } = useI18n()
  const selectedRowRef = useRef<HTMLTableRowElement | null>(null)

  // Keep the selected row visible when the selection comes from a map pin.
  useEffect(() => {
    selectedRowRef.current?.scrollIntoView({ block: 'nearest' })
  }, [selectedId, page])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: 0, flex: 1 }}>
      <TableContainer sx={{ flex: 1, minHeight: 0 }}>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.key}
                  sortDirection={orderBy === column.key ? order : false}
                  sx={{
                    fontWeight: 700,
                    whiteSpace: column.key === 'nearest' ? 'normal' : 'nowrap',
                    ...(column.hideOnNarrow
                      ? { display: { xs: 'none', lg: 'table-cell' } }
                      : null),
                  }}
                >
                  <TableSortLabel
                    active={orderBy === column.key}
                    direction={orderBy === column.key ? order : 'asc'}
                    onClick={() => onSort(column.key)}
                  >
                    {column.label(t)}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell align="right" sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>
                {t.colMap}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((condo) => {
              const selected = condo.id === selectedId
              const name = primaryName(condo, lang)
              return (
                <TableRow
                  key={condo.id}
                  hover
                  selected={selected}
                  ref={selected ? selectedRowRef : undefined}
                  onClick={() => onSelect(condo.id)}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell sx={{ color: 'text.secondary' }}>{condo.id}</TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.35 }}>
                      {name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {secondaryName(condo, lang)}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>{districtLabel(condo, lang)}</TableCell>
                  <TableCell
                    sx={{ display: { xs: 'none', lg: 'table-cell' } }}
                  >
                    {nearestLabel(condo, lang)}
                  </TableCell>
                  <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
                    <Tooltip title={t.colMap}>
                      <IconButton
                        size="small"
                        aria-label={t.showOnMap(name)}
                        onClick={(event) => {
                          event.stopPropagation()
                          onShowOnMap(condo.id)
                        }}
                      >
                        <PlaceIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={t.openInGoogleMapsShort}>
                      <IconButton
                        size="small"
                        component="a"
                        href={googleMapsUrl(condo)}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={t.openInGoogleMaps(name)}
                        onClick={(event) => event.stopPropagation()}
                      >
                        <OpenInNewIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              )
            })}
            {rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length + 1} sx={{ py: 6, textAlign: 'center' }}>
                  <Typography color="text.secondary">{t.noResults}</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={total}
        page={page}
        onPageChange={(_, nextPage) => onPageChange(nextPage)}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[10, 25, 50]}
        onRowsPerPageChange={(event) => onRowsPerPageChange(Number(event.target.value))}
        labelRowsPerPage={t.rowsPerPage}
        labelDisplayedRows={({ from, to, count }) => t.displayedRows(from, to, count)}
        sx={{ borderTop: 1, borderColor: 'divider', flexShrink: 0 }}
      />
    </Box>
  )
}
