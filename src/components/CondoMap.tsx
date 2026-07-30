import { useEffect, useMemo, useRef } from 'react'
import L from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import 'leaflet/dist/leaflet.css'
import { useI18n } from '../i18n/context'
import type { Condo } from '../types'
import {
  districtLabel,
  googleMapsUrl,
  nearestLabel,
  primaryName,
  secondaryName,
} from '../utils/maps'

const BANGKOK_CENTER: L.LatLngExpression = [13.745, 100.56]

function pinIcon(id: number, selected: boolean): L.DivIcon {
  const size = selected ? 40 : 30
  return L.divIcon({
    className: 'condo-pin-wrapper',
    html: `<div class="condo-pin${selected ? ' condo-pin--selected' : ''}"><span>${id}</span></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size + 4],
  })
}

/**
 * Keeps the viewport in sync with the filtered result set and the selection.
 *
 * Every camera move is gated on the container actually having a size: while the
 * map sits behind the mobile "table" tab it is `display: none`, and Leaflet
 * projects a 0x0 container to NaN coordinates, which throws. The effect re-runs
 * when `active` flips, so a selection made from the hidden state is applied as
 * soon as the map is on screen.
 */
function ViewportSync({
  condos,
  selected,
  active,
}: {
  condos: Condo[]
  selected: Condo | undefined
  active: boolean
}) {
  const map = useMap()
  const filterKey = condos.map((condo) => condo.id).join(',')

  // Leaflet caches its container size; refresh it whenever the container resizes.
  useEffect(() => {
    const observer = new ResizeObserver(() => map.invalidateSize())
    observer.observe(map.getContainer())
    return () => observer.disconnect()
  }, [map])

  useEffect(() => {
    if (!active) return
    map.invalidateSize()
    const size = map.getSize()
    if (size.x === 0 || size.y === 0) return

    if (selected) {
      map.flyTo([selected.lat, selected.lng], Math.max(map.getZoom(), 16), { duration: 0.6 })
      return
    }
    if (condos.length === 0) {
      map.setView(BANGKOK_CENTER, 11)
      return
    }
    const bounds = L.latLngBounds(condos.map((condo) => [condo.lat, condo.lng]))
    map.fitBounds(bounds, { padding: [56, 56], maxZoom: 15 })
  }, [active, selected, filterKey, condos, map])

  return null
}

interface CondoMapProps {
  condos: Condo[]
  selectedId: number | null
  onSelect: (id: number) => void
  /** False while the map is hidden behind the mobile "table" tab. */
  active?: boolean
}

export default function CondoMap({ condos, selectedId, onSelect, active = true }: CondoMapProps) {
  const { lang, t } = useI18n()
  const markerRefs = useRef(new Map<number, L.Marker>())
  const selected = useMemo(
    () => condos.find((condo) => condo.id === selectedId),
    [condos, selectedId],
  )

  // Open the popup of whatever the table selected, once the map is on screen.
  useEffect(() => {
    if (!active || selectedId == null) return
    const timer = window.setTimeout(() => markerRefs.current.get(selectedId)?.openPopup(), 160)
    return () => window.clearTimeout(timer)
  }, [active, selectedId, condos])

  return (
    <Box sx={{ position: 'relative', height: '100%', width: '100%' }}>
      <MapContainer
        center={BANGKOK_CENTER}
        zoom={11}
        scrollWheelZoom
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />
        <ViewportSync condos={condos} selected={selected} active={active} />
        {condos.map((condo) => (
          <Marker
            key={condo.id}
            position={[condo.lat, condo.lng]}
            icon={pinIcon(condo.id, condo.id === selectedId)}
            zIndexOffset={condo.id === selectedId ? 1000 : 0}
            ref={(instance) => {
              if (instance) markerRefs.current.set(condo.id, instance)
              else markerRefs.current.delete(condo.id)
            }}
            eventHandlers={{ click: () => onSelect(condo.id) }}
          >
            <Popup>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, lineHeight: 1.35 }}>
                {condo.id}. {primaryName(condo, lang)}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                {secondaryName(condo, lang)}
              </Typography>
              <Typography variant="body2" sx={{ mt: 0.75 }}>
                {t.popupLocation(districtLabel(condo, lang), nearestLabel(condo, lang))}
              </Typography>
              <Button
                size="small"
                variant="contained"
                endIcon={<OpenInNewIcon />}
                href={googleMapsUrl(condo)}
                target="_blank"
                rel="noreferrer noopener"
                sx={{ mt: 1.25, textTransform: 'none' }}
              >
                {t.openInGoogleMapsShort}
              </Button>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <Box
        sx={{
          position: 'absolute',
          top: 12,
          right: 12,
          zIndex: 500,
          bgcolor: 'rgba(255,255,255,0.94)',
          borderRadius: 1.5,
          boxShadow: 2,
          px: 1.5,
          py: 0.75,
        }}
      >
        <Typography variant="caption" sx={{ fontWeight: 600 }}>
          {t.pinCount(condos.length)}
        </Typography>
      </Box>
    </Box>
  )
}
