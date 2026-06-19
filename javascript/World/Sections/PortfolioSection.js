import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import helvetikerFont from 'three/examples/fonts/helvetiker_bold.typeface.json'
import {
    aboutContent,
    experienceContent,
    introContent,
    projectsContent,
    talksContent
} from '../../../src/data/driveWorldContent'
import webexCallingExtensionImage from '@project-media/webex-calling-extension.png'
import flappyBirdVideo from '@project-media/flappy-bird.mov'
import aiWrapupImage from '@project-media/ai-wrapup.jpg'
import webexCallingImage from '@project-media/webex-calling.png'
import webexMeetingsImage from '@project-media/webex-meetings.png'

const THEME = {
    page: '#fff9d2',
    card: '#fffef2',
    cardAlt: '#ffe8c8',
    border: '#b9dcf2',
    ink: '#243b53',
    muted: '#607486',
    accent: '#3f93c5',
    blue: '#3f93c5',
    orange: '#f0a83a',
    green: '#55a868',
    purple: '#8b71d9',
    red: '#d66b3d'
}

const BODY_FONT = '"NTR", Arial, sans-serif'
const MONO_FONT = '"SFMono-Regular", Consolas, "Liberation Mono", monospace'
const READING_CAMERA_PADDING = 2.5
const JUNCTION_TILE_GAP = 4.2
const SOFTWARE_BANNER_OFFSET = new THREE.Vector3(1.2, 6.25, 0)
const SOFTWARE_SIDE_BANNER_OFFSET = new THREE.Vector3(6.75, 0.85, 0)
const FLAPPY_BANNER_OFFSET = new THREE.Vector3(6.75, 3.05, 0)
const SOFTWARE_BANNER_SIZE = new THREE.Vector2(5.8, 3.55)
const SOFTWARE_BANNER_LIFT = 0.7

const TEXT_FONT = new FontLoader().parse(helvetikerFont)

const normalizeText = (text = '') => text.replace(/[’‘]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, ' ').trim()

const wrapText = (context, text, maxWidth) =>
{
    const words = normalizeText(text).split(' ')
    const lines = []
    let line = ''

    for(const word of words)
    {
        const testLine = line ? `${line} ${word}` : word
        const width = context.measureText(testLine).width

        if(width > maxWidth && line)
        {
            lines.push(line)
            line = word
        }
        else
        {
            line = testLine
        }
    }

    if(line)
    {
        lines.push(line)
    }

    return lines
}

const drawRoundRect = (context, x, y, width, height, radius) =>
{
    context.beginPath()
    context.moveTo(x + radius, y)
    context.lineTo(x + width - radius, y)
    context.quadraticCurveTo(x + width, y, x + width, y + radius)
    context.lineTo(x + width, y + height - radius)
    context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
    context.lineTo(x + radius, y + height)
    context.quadraticCurveTo(x, y + height, x, y + height - radius)
    context.lineTo(x, y + radius)
    context.quadraticCurveTo(x, y, x + radius, y)
    context.closePath()
}

const createLinkButtonTexture = ({ label, width = 512, height = 160 }) =>
{
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height

    const context = canvas.getContext('2d')
    context.clearRect(0, 0, width, height)

    context.fillStyle = 'rgba(255, 254, 242, 0.9)'
    drawRoundRect(context, 14, 14, width - 28, height - 28, 28)
    context.fill()

    context.strokeStyle = THEME.blue
    context.lineWidth = 8
    context.stroke()

    context.fillStyle = THEME.blue
    context.font = `900 58px ${BODY_FONT}`
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    context.fillText(normalizeText(label).toUpperCase(), width / 2, height / 2 + 5)

    const texture = new THREE.CanvasTexture(canvas)
    texture.colorSpace = THREE.SRGBColorSpace
    texture.magFilter = THREE.LinearFilter
    texture.minFilter = THREE.LinearFilter

    return texture
}

const createDriveInstructionsTexture = ({ width = 768, height = 512 }) =>
{
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height

    const context = canvas.getContext('2d')
    context.clearRect(0, 0, width, height)

    const drawKey = (label, x, y, keyWidth = 118) =>
    {
        context.strokeStyle = THEME.ink
        context.lineWidth = 6
        context.fillStyle = 'rgba(63, 147, 197, 0.08)'
        drawRoundRect(context, x, y, keyWidth, 48, 4)
        context.fill()
        context.stroke()

        context.fillStyle = THEME.ink
        context.font = `900 29px ${MONO_FONT}`
        context.textAlign = 'center'
        context.textBaseline = 'middle'
        context.fillText(label, x + keyWidth * 0.5, y + 26)
    }

    const keyX = 78
    const actionX = 280
    const rows = [
        { key: 'SHIFT', action: 'BOOST', y: 58, keyWidth: 150 },
        { key: 'SPACE', action: 'BRAKE', y: 124, keyWidth: 150 },
        { key: 'M', action: 'MUTE', y: 190, keyWidth: 82 },
        { key: 'R', action: 'RESET THE CAR', y: 256, keyWidth: 82 },
        { key: 'WHEEL', action: 'ZOOM IN AND OUT', y: 322, keyWidth: 150 },
        { key: 'H', action: 'HONK', y: 388, keyWidth: 82 }
    ]

    rows.forEach((row) =>
    {
        drawKey(row.key, keyX + (150 - row.keyWidth) * 0.5, row.y, row.keyWidth)

        context.fillStyle = THEME.ink
        context.font = `900 34px ${BODY_FONT}`
        context.textAlign = 'left'
        context.textBaseline = 'middle'
        context.fillText(row.action, actionX, row.y + 25)
    })

    const texture = new THREE.CanvasTexture(canvas)
    texture.colorSpace = THREE.SRGBColorSpace
    texture.magFilter = THREE.LinearFilter
    texture.minFilter = THREE.LinearFilter

    return texture
}

const createIntroTexture = ({ body, chips = [], lines = [], width, height }) =>
{
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height

    const context = canvas.getContext('2d')
    context.clearRect(0, 0, width, height)

    const left = 76
    let cursorY = 116

    context.textBaseline = 'alphabetic'
    context.font = `500 116px ${BODY_FONT}`
    context.fillStyle = THEME.ink
    context.fillText(introContent.greetingPrefix, left, cursorY)

    const prefixWidth = context.measureText(introContent.greetingPrefix).width
    context.font = `800 116px ${BODY_FONT}`
    context.fillStyle = THEME.blue
    context.fillText(introContent.name, left + prefixWidth, cursorY)

    cursorY += 78
    context.font = `500 31px ${MONO_FONT}`
    let chipX = left

    for(const chip of chips)
    {
        const label = normalizeText(chip)
        const chipWidth = context.measureText(label).width + 38

        context.fillStyle = 'rgba(199, 230, 248, 0.45)'
        drawRoundRect(context, chipX, cursorY - 34, chipWidth, 48, 20)
        context.fill()
        context.strokeStyle = 'rgba(63, 147, 197, 0.25)'
        context.lineWidth = 2
        context.stroke()

        context.fillStyle = THEME.blue
        context.fillText(label, chipX + 19, cursorY)
        chipX += chipWidth + 18
    }

    cursorY += 72
    context.font = `500 45px ${BODY_FONT}`
    context.fillStyle = THEME.muted

    for(const line of wrapText(context, body, width - left * 2).slice(0, 5))
    {
        context.fillText(line, left, cursorY)
        cursorY += 58
    }

    cursorY += 36
    const command = normalizeText(lines[0] || introContent.command)
    context.font = `500 31px ${MONO_FONT}`
    const commandWidth = Math.min(context.measureText(command).width + 104, width - left * 2)

    context.fillStyle = 'rgba(255, 254, 242, 0.64)'
    drawRoundRect(context, left, cursorY - 38, commandWidth, 64, 8)
    context.fill()
    context.fillStyle = THEME.blue
    drawRoundRect(context, left, cursorY - 38, 6, 64, 3)
    context.fill()

    context.fillStyle = THEME.blue
    context.fillText(introContent.commandPrompt, left + 36, cursorY)
    context.fillStyle = THEME.ink
    context.fillText(command, left + 78, cursorY)

    const texture = new THREE.CanvasTexture(canvas)
    texture.colorSpace = THREE.SRGBColorSpace
    texture.magFilter = THREE.LinearFilter
    texture.minFilter = THREE.LinearFilter

    return texture
}

const createAboutTexture = ({ body, lines = [], chips = [], width, height }) =>
{
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height

    const context = canvas.getContext('2d')
    context.clearRect(0, 0, width, height)

    const left = 88
    const contentWidth = width - left * 2
    let cursorY = 108

    context.textBaseline = 'alphabetic'
    context.font = `800 72px ${BODY_FONT}`

    const titleWidth = context.measureText(aboutContent.sectionTitle).width
    context.strokeStyle = 'rgba(63, 147, 197, 0.18)'
    context.lineWidth = 2
    context.beginPath()
    context.moveTo(left + titleWidth + 44, cursorY - 28)
    context.lineTo(width - left, cursorY - 28)
    context.stroke()

    cursorY += 90
    context.font = `500 39px ${BODY_FONT}`
    context.fillStyle = THEME.muted

    for(const line of wrapText(context, body, contentWidth).slice(0, 5))
    {
        context.fillText(line, left, cursorY)
        cursorY += 56
    }

    cursorY += 48
    context.fillText(aboutContent.techIntro, left, cursorY)

    cursorY += 76
    context.font = `500 34px ${BODY_FONT}`
    const columnWidth = contentWidth * 0.48
    const rowGap = 54

    chips.forEach((chip, index) =>
    {
        const column = index % 2
        const row = Math.floor(index / 2)
        const x = left + column * columnWidth
        const y = cursorY + row * rowGap

        context.fillStyle = THEME.blue
        context.font = `500 30px ${BODY_FONT}`
        context.fillText('▹', x, y)
        context.fillStyle = THEME.muted
        context.font = `500 34px ${BODY_FONT}`
        context.fillText(normalizeText(chip), x + 34, y)
    })

    cursorY += Math.ceil(chips.length / 2) * rowGap + 68
    context.font = `500 39px ${BODY_FONT}`
    context.fillStyle = THEME.muted

    for(const line of wrapText(context, lines[0] || '', contentWidth).slice(0, 4))
    {
        context.fillText(line, left, cursorY)
        cursorY += 56
    }

    const texture = new THREE.CanvasTexture(canvas)
    texture.colorSpace = THREE.SRGBColorSpace
    texture.magFilter = THREE.LinearFilter
    texture.minFilter = THREE.LinearFilter

    return texture
}

const createExperienceTexture = ({ title, eyebrow, body, lines = [], width, height }) =>
{
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height

    const context = canvas.getContext('2d')
    context.clearRect(0, 0, width, height)

    const left = 84
    const contentWidth = width - left * 2
    let cursorY = 112
    const company = normalizeText(title)
    const jobTitle = normalizeText(body).replace(new RegExp(`\\s*${company}$`), '').trim()

    context.textBaseline = 'alphabetic'
    context.font = `800 62px ${BODY_FONT}`
    context.fillStyle = THEME.ink
    context.fillText(`${jobTitle} `, left, cursorY)

    const jobTitleWidth = context.measureText(`${jobTitle} `).width
    context.fillStyle = THEME.blue
    context.fillText(company, left + jobTitleWidth, cursorY)

    cursorY += 68
    context.font = `500 38px ${BODY_FONT}`
    context.fillStyle = THEME.muted
    context.fillText(normalizeText(eyebrow), left, cursorY)

    cursorY += 86
    context.font = `500 38px ${BODY_FONT}`
    const bulletX = left
    const textX = left + 66

    lines.forEach((line) =>
    {
        const wrappedLines = wrapText(context, line, contentWidth - 74)

        context.fillStyle = THEME.blue
        context.font = `500 34px ${BODY_FONT}`
        context.fillText('▹', bulletX, cursorY)

        context.fillStyle = THEME.muted
        context.font = `500 38px ${BODY_FONT}`
        wrappedLines.forEach((wrappedLine, lineIndex) =>
        {
            context.fillText(wrappedLine, textX, cursorY + lineIndex * 52)
        })

        cursorY += wrappedLines.length * 52 + 34
    })

    const texture = new THREE.CanvasTexture(canvas)
    texture.colorSpace = THREE.SRGBColorSpace
    texture.magFilter = THREE.LinearFilter
    texture.minFilter = THREE.LinearFilter

    return texture
}

const createTalkTexture = ({ title, eyebrow, body, width, height }) =>
{
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height

    const context = canvas.getContext('2d')
    context.clearRect(0, 0, width, height)
    context.fillStyle = THEME.cardAlt
    context.fillRect(0, 0, width, height)

    const left = 78
    const contentWidth = width - left * 2
    let cursorY = 100

    context.fillStyle = THEME.blue
    context.font = `600 31px ${MONO_FONT}`
    context.fillText(normalizeText(eyebrow), left, cursorY)

    cursorY += 82
    context.fillStyle = THEME.ink
    context.font = `700 58px ${BODY_FONT}`
    const titleLines = wrapText(context, title, contentWidth).slice(0, 2)
    titleLines.forEach((line) =>
    {
        context.fillText(line, left, cursorY)
        cursorY += 68
    })

    cursorY += 34
    context.fillStyle = THEME.muted
    context.font = `500 43px ${BODY_FONT}`
    const bodyLines = wrapText(context, body, contentWidth).slice(0, 5)
    bodyLines.forEach((line) =>
    {
        context.fillText(line, left, cursorY)
        cursorY += 56
    })

    const texture = new THREE.CanvasTexture(canvas)
    texture.colorSpace = THREE.SRGBColorSpace
    texture.magFilter = THREE.LinearFilter
    texture.minFilter = THREE.LinearFilter

    return texture
}

const createSoftwareTexture = ({ title, eyebrow, body, width, height, accent }) =>
{
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height

    const context = canvas.getContext('2d')
    context.clearRect(0, 0, width, height)

    const left = 76
    const contentWidth = width - left * 2
    let cursorY = 118

    if(eyebrow)
    {
        context.fillStyle = accent
        context.font = `700 31px ${BODY_FONT}`
        context.fillText(normalizeText(eyebrow).toUpperCase(), left, cursorY)
        cursorY += 72
    }

    context.fillStyle = THEME.ink
    context.font = `800 72px ${BODY_FONT}`
    const titleLines = wrapText(context, title.toUpperCase(), contentWidth).slice(0, 2)
    titleLines.forEach((line) =>
    {
        context.fillText(line, left, cursorY)
        cursorY += 78
    })

    cursorY += 20
    context.fillStyle = THEME.muted
    context.font = `500 42px ${BODY_FONT}`
    const bodyLines = wrapText(context, body, contentWidth).slice(0, 5)
    bodyLines.forEach((line) =>
    {
        context.fillText(line, left, cursorY)
        cursorY += 52
    })

    const texture = new THREE.CanvasTexture(canvas)
    texture.colorSpace = THREE.SRGBColorSpace
    texture.magFilter = THREE.LinearFilter
    texture.minFilter = THREE.LinearFilter

    return texture
}

const createPanelTexture = ({
    title,
    eyebrow,
    body,
    lines = [],
    chips = [],
    accent = THEME.accent,
    variant = 'card',
    width = 1400,
    height = 700
}) =>
{
    if(variant === 'intro')
    {
        return createIntroTexture({ body, chips, lines, width: 1400, height: 900 })
    }

    if(variant === 'about')
    {
        return createAboutTexture({ body, chips, lines, width: 1400, height: 960 })
    }

    if(variant === 'experience')
    {
        return createExperienceTexture({ title, eyebrow, body, lines, width: 1400, height: 900 })
    }

    if(variant === 'talk')
    {
        return createTalkTexture({ title, eyebrow, body, width: 1000, height: 680 })
    }

    if(variant === 'software')
    {
        return createSoftwareTexture({ title, eyebrow, body, width: 1100, height: 650, accent })
    }

    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height

    const context = canvas.getContext('2d')
    context.clearRect(0, 0, width, height)

    const isTerminal = variant === 'terminal'
    const textColor = THEME.ink
    const mutedColor = isTerminal ? THEME.lightSlate || THEME.muted : THEME.muted

    if(eyebrow)
    {
        context.fillStyle = accent
        context.font = `700 34px ${BODY_FONT}`
        context.fillText(normalizeText(eyebrow).toUpperCase(), 74, 118)
    }

    context.fillStyle = textColor
    context.font = `800 86px ${BODY_FONT}`
    context.fillText(normalizeText(title).toUpperCase(), 72, eyebrow ? 190 : 132)

    let cursorY = eyebrow ? 262 : 202
    context.fillStyle = mutedColor
    context.font = isTerminal ? `500 34px ${MONO_FONT}` : `500 43px ${BODY_FONT}`

    const bodyLines = [
        ...wrapText(context, body, width - 180),
        ...lines.flatMap((line) => wrapText(context, line, width - 180))
    ].slice(0, 8)

    bodyLines.forEach((line) =>
    {
        context.fillText(line, 76, cursorY)
        cursorY += isTerminal ? 44 : 48
    })

    if(chips.length)
    {
        cursorY += 18
        context.font = `700 31px ${BODY_FONT}`
        let chipX = 74

        for(const chip of chips.slice(0, 8))
        {
            const label = normalizeText(chip)
            const chipWidth = context.measureText(label).width + 38

            if(chipX + chipWidth > width - 100)
            {
                chipX = 74
                cursorY += 58
            }

            context.fillStyle = 'rgba(63, 147, 197, 0.16)'
            drawRoundRect(context, chipX, cursorY - 32, chipWidth, 42, 18)
            context.fill()
            context.fillStyle = accent
            context.fillText(label, chipX + 19, cursorY)
            chipX += chipWidth + 16
        }
    }

    const texture = new THREE.CanvasTexture(canvas)
    texture.colorSpace = THREE.SRGBColorSpace
    texture.magFilter = THREE.LinearFilter
    texture.minFilter = THREE.LinearFilter

    return texture
}

export default class PortfolioSection
{
    constructor(_options)
    {
        this.objects = _options.objects
        this.resources = _options.resources
        this.areas = _options.areas
        this.tiles = _options.tiles
        this.time = _options.time
        this.camera = _options.camera
        this.car = _options.car
        this.readingZones = []
        this.readingCameraActive = false
        this.defaultZoomTarget = this.camera.zoom.targetValue

        this.container = new THREE.Object3D()
        this.container.matrixAutoUpdate = false
        this.textBounds = []
        this.startPoint = new THREE.Vector2(- 8, 16)
        this.introExitPoint = new THREE.Vector2(- 8, 4)
        this.junction = new THREE.Vector2(0, - 42)

        this.experiencePoints = [
            new THREE.Vector2(- 24, - 44),
            new THREE.Vector2(- 44, - 44),
            new THREE.Vector2(- 64, - 44)
        ]
        this.softwarePoints = projectsContent.projects.map((_, index) =>
        {
            const columns = 3
            const column = index % columns
            const row = Math.floor(index / columns)
            const x = row % 2 === 0 ? 24 + column * 18 : 24 + (columns - 1 - column) * 18
            const y = - 44 - row * 13

            return new THREE.Vector2(x, y)
        })

        this.sectionAnchors = {
            intro: new THREE.Vector3(0, 4, 0),
            about: new THREE.Vector3(- 8, - 18, 0),
            experience: new THREE.Vector3(this.experiencePoints[0].x, this.experiencePoints[0].y, 0),
            software: new THREE.Vector3(this.softwarePoints[0].x, this.softwarePoints[0].y, 0),
            talks: new THREE.Vector3(0, - 82, 0)
        }
        this.routeSegments = [
            [this.startPoint, this.introExitPoint],
            [this.introExitPoint, new THREE.Vector2(- 8, - 18)],
            [new THREE.Vector2(- 8, - 18), this.junction],
            ...this.createPointSegments([this.junction, ...this.experiencePoints]),
            ...this.createPointSegments([this.junction, ...this.softwarePoints]),
            [this.junction, new THREE.Vector2(this.sectionAnchors.talks.x, this.sectionAnchors.talks.y)]
        ]

        this.setSections()
        this.setRoutes()
        this.setPathwayGuides()
        this.setAboutRamp()
        this.setPathwayTrees()
        this.setAreaTreeClusters()
        this.setRouteGuideWalls()
        this.setExperienceGuideWalls()
        this.setMarkedGuideWalls()
        this.setTalksGuideWalls()
        this.setIntersectionSigns()
        this.setReadingCamera()
    }

    createPointSegments(points)
    {
        return points.slice(0, - 1).map((point, index) => [point, points[index + 1]])
    }

    setRoutes()
    {
        if(this.tiles)
        {
            for(const [from, to] of this.routeSegments)
            {
                this.addRouteTiles({
                    start: from,
                    delta: to.clone().sub(from)
                })
            }
        }
    }

    setSections()
    {
        this.addStartInstructions()
        this.addIntroSection()
        this.addAboutSection()
        this.addExperienceSection()
        this.addSoftwareSection()
        this.addTalksSection()
    }

    addStartInstructions()
    {
        const size = new THREE.Vector2(9.2, 6.15)
        const position = new THREE.Vector3(this.startPoint.x - 8.1, this.startPoint.y - 1.1, 0.055)
        const texture = createDriveInstructionsTexture({})
        const mesh = new THREE.Mesh(
            new THREE.PlaneGeometry(size.x, size.y),
            new THREE.MeshBasicMaterial({
                map: texture,
                transparent: true,
                depthWrite: false,
                side: THREE.DoubleSide
            })
        )

        mesh.position.copy(position)
        mesh.matrixAutoUpdate = false
        mesh.updateMatrix()
        this.container.add(mesh)

        this.textBounds.push({
            position: position.clone(),
            halfExtents: new THREE.Vector2(size.x * 0.5 + 0.5, size.y * 0.5 + 0.5)
        })
    }

    addIntroSection()
    {
        const anchor = this.sectionAnchors.intro
        const panelPosition = anchor.clone().add(new THREE.Vector3(2, 5, 0.04))
        this.addGroundPanel({
            title: `${introContent.greetingPrefix}${introContent.name}`,
            eyebrow: introContent.terminalTitle,
            body: introContent.description,
            lines: [introContent.command],
            chips: introContent.focusAreas,
            variant: 'intro',
            position: panelPosition,
            size: new THREE.Vector2(16, 10.3),
            accent: THEME.blue
        })
        this.addLinkButton({
            label: introContent.contactText.trim(),
            href: introContent.contactHref,
            position: panelPosition.clone().add(new THREE.Vector3(- 5.35, - 3.45, 0.08)),
            size: new THREE.Vector2(3.8, 1.08)
        })
    }

    addAboutSection()
    {
        const anchor = this.sectionAnchors.about
        this.add3DHeading({
            title: aboutContent.sectionTitle,
            position: anchor.clone().add(new THREE.Vector3(- 4.25, 8.85, 0)),
            scale: new THREE.Vector3(4.7, 0.95, 0.45),
            materialName: 'Black',
            preserveCase: true,
            mass: 8,
            sleep: false,
            shadow: { sizeX: 5.2, sizeY: 1.2, offsetZ: - 0.2, alpha: 0.35 }
        })
        this.addGroundPanel({
            title: aboutContent.sectionTitle,
            eyebrow: '',
            body: `${aboutContent.introPrefix}${aboutContent.currentRole} at ${aboutContent.companyName}${aboutContent.introSuffix}`,
            lines: [aboutContent.afterHours],
            chips: aboutContent.techStack,
            variant: 'about',
            position: anchor.clone().add(new THREE.Vector3(0.5, 3.6, 0.04)),
            size: new THREE.Vector2(16, 11),
            accent: THEME.green
        })
    }

    addExperienceSection()
    {
        const anchor = this.sectionAnchors.experience
        this.addSectionHeader({
            title: experienceContent.sectionTitle,
            position: anchor.clone().add(new THREE.Vector3(- 9, 6.5, 0)),
            accentKey: 'orange',
            scale: new THREE.Vector3(7.2, 1.45, 0.65)
        })

        experienceContent.items.forEach((item, index) =>
        {
            const point = this.experiencePoints[index]
            const position = new THREE.Vector3(point.x, point.y, 0.04)

            this.addGroundPanel({
                title: item.company,
                eyebrow: item.duration,
                body: `${item.jobTitle} ${item.company}`,
                lines: item.desc,
                variant: 'experience',
                position,
                size: new THREE.Vector2(13.5, 8.7),
                accent: index === 0 ? THEME.orange : THEME.blue
            })
            this.addLowBlock({
                position: position.clone().add(new THREE.Vector3(- 6.8, 3.8, - 0.04)),
                scale: new THREE.Vector3(1.2, 1.2, 1.4),
                materialName: 'Purple'
            })
        })
    }

    addSoftwareSection()
    {
        const anchor = this.sectionAnchors.software
        this.addSectionHeader({
            title: projectsContent.sectionTitle,
            position: anchor.clone().add(new THREE.Vector3(- 8, 7.8, 0)),
            accentKey: 'blue'
        })

        projectsContent.projects.forEach((project, index) =>
        {
            const point = this.softwarePoints[index]
            const column = index % 3
            const position = new THREE.Vector3(point.x, point.y, 0.04)

            this.addGroundPanel({
                title: project.name,
                eyebrow: project.techStack,
                body: project.desc,
                lines: [],
                variant: 'software',
                position,
                size: new THREE.Vector2(10.8, 6.4),
                accent: column === 0 ? THEME.blue : column === 1 ? THEME.green : THEME.orange
            })
            const buttonY = position.y - 3.25
            if(project.link)
            {
                this.addLinkButton({
                    label: 'GitHub',
                    href: project.link,
                    position: new THREE.Vector3(position.x - 2.05, buttonY, 0.08),
                    size: new THREE.Vector2(3.2, 0.95)
                })
            }
            if(project.open)
            {
                this.addLinkButton({
                    label: project.open.includes('npmjs.com') ? 'npm' : 'Open',
                    href: project.open,
                    position: new THREE.Vector3(position.x + 2.05, buttonY, 0.08),
                    size: new THREE.Vector2(3.2, 0.95)
                })
            }
            this.addLowBlock({
                position: position.clone().add(new THREE.Vector3(- 5.8, 3.3, - 0.04)),
                scale: new THREE.Vector3(0.9, 0.9, 1.1),
                materialName: 'Purple'
            })
            if(project.mediaId === 'webexCallingExtensionImage' || project.name === 'Webex Calling Chrome Extension')
            {
                this.addImageBanner({
                    imageSrc: webexCallingExtensionImage,
                    position: position.clone().add(SOFTWARE_SIDE_BANNER_OFFSET),
                    rotation: - Math.PI * 0.08,
                    size: SOFTWARE_BANNER_SIZE
                })
            }
            if(project.mediaId === 'webexCallingImage' || project.name === 'Webex Calling SDK')
            {
                this.addImageBanner({
                    imageSrc: webexCallingImage,
                    position: position.clone().add(SOFTWARE_BANNER_OFFSET),
                    rotation: - Math.PI * 0.08,
                    size: SOFTWARE_BANNER_SIZE
                })
            }
            if(project.mediaId === 'webexMeetingsImage' || project.name === 'Webex Meetings SDK')
            {
                this.addImageBanner({
                    imageSrc: webexMeetingsImage,
                    position: position.clone().add(SOFTWARE_BANNER_OFFSET),
                    rotation: - Math.PI * 0.08,
                    size: SOFTWARE_BANNER_SIZE
                })
            }
            if(project.mediaId === 'aiWrapupImage' || project.name === 'Contact Center Widgets')
            {
                this.addImageBanner({
                    imageSrc: aiWrapupImage,
                    position: position.clone().add(SOFTWARE_BANNER_OFFSET),
                    rotation: - Math.PI * 0.08,
                    size: SOFTWARE_BANNER_SIZE
                })
            }
            if(project.name === 'Flappy Bird Replica')
            {
                this.addVideoBanner({
                    videoSrc: flappyBirdVideo,
                    position: position.clone().add(FLAPPY_BANNER_OFFSET),
                    rotation: - Math.PI * 0.08,
                    size: SOFTWARE_BANNER_SIZE
                })
            }
        })
    }

    addTalksSection()
    {
        const anchor = this.sectionAnchors.talks
        this.addSectionHeader({
            title: talksContent.sectionTitle,
            position: anchor.clone().add(new THREE.Vector3(- 9, 7.4, 0)),
            accentKey: 'purple'
        })

        talksContent.talks.forEach((talk, index) =>
        {
            const position = anchor.clone().add(new THREE.Vector3(- 12 + index * 12, - 1.8, 0.04))
            this.addGroundPanel({
                title: talk.title,
                eyebrow: talk.label,
                body: talk.desc,
                lines: [],
                variant: 'talk',
                position,
                size: new THREE.Vector2(10.8, 7.35),
                accent: index === 1 ? THEME.blue : THEME.purple
            })
            this.addLinkButton({
                label: talksContent.watchText,
                href: talk.href,
                position: position.clone().add(new THREE.Vector3(- 2.05, - 2.72, 0.04)),
                size: new THREE.Vector2(3.2, 0.95)
            })
            this.addLinkButton({
                label: talksContent.appText,
                href: talk.sampleHref,
                position: position.clone().add(new THREE.Vector3(2.05, - 2.72, 0.04)),
                size: new THREE.Vector2(3.2, 0.95)
            })
        })

    }

    setPathwayGuides()
    {
        this.addGuideWall({
            position: new THREE.Vector3(- 11.25, 7.4, 0),
            length: 5.4,
            rotation: - Math.PI * 0.5
        })
        this.addGuideWall({
            position: new THREE.Vector3(- 6.8, 18.45, 0),
            length: 8.8,
            rotation: - Math.PI * 0.04
        })
    }

    setAboutRamp()
    {
        this.addJumpRamp({
            position: new THREE.Vector3(- 14.2, - 29.8, 0.08),
            rotation: Math.PI * 0.5
        })
    }

    setPathwayTrees()
    {
        const from = this.startPoint.clone()
        const to = new THREE.Vector2(- 8, - 18)
        const direction = to.clone().sub(from).normalize()
        const tangent = direction.clone().rotateAround(new THREE.Vector2(0, 0), Math.PI * 0.5)
        const treePoints = [
            { progress: 0.02, side: - 1, offset: 10.2, scale: 0.76 },
            { progress: 0.24, side: 1, offset: 7.8, scale: 0.68 },
            { progress: 0.42, side: - 1, offset: 10.4, scale: 0.82 },
            { progress: 0.6, side: 1, offset: 8.1, scale: 0.74 },
            { progress: 0.78, side: - 1, offset: 8.7, scale: 0.72 }
        ]

        treePoints.forEach((tree, index) =>
        {
            const point = from.clone()
                .lerp(to, tree.progress)
                .add(tangent.clone().multiplyScalar(tree.side * tree.offset))

            const clusterOffsets = [
                new THREE.Vector2(0, 0),
                direction.clone().multiplyScalar(1.35),
                direction.clone().multiplyScalar(- 1.2),
                tangent.clone().multiplyScalar(tree.side * 1.05)
            ]

            clusterOffsets.forEach((offset, clusterIndex) =>
            {
                const clusterPoint = point.clone().add(offset)

                if(this.isInsideTextBounds(clusterPoint) || this.isNearRoute(clusterPoint, 2.8))
                {
                    return
                }

                this.addDecoration({
                    type: 'tree',
                    x: clusterPoint.x,
                    y: clusterPoint.y,
                    scale: tree.scale * (clusterIndex === 0 ? 1 : 0.72 + clusterIndex * 0.06),
                    rotation: index * 0.67 + clusterIndex * 0.41
                })
            })
        })
    }

    setAreaTreeClusters()
    {
        const clusters = [
            // Start instructions
            { center: new THREE.Vector2(- 23.3, 17.2), count: 4, spread: 2.1, baseScale: 0.5 },
            { center: new THREE.Vector2(- 13.7, 20.4), count: 3, spread: 1.8, baseScale: 0.46 },

            // Intersection
            { center: new THREE.Vector2(- 10.8, - 37.4), count: 4, spread: 2.8, baseScale: 0.54 },
            { center: new THREE.Vector2(9.4, - 36.8), count: 4, spread: 2.6, baseScale: 0.52 },
            { center: new THREE.Vector2(- 8.6, - 50.8), count: 3, spread: 2.2, baseScale: 0.5 },
            { center: new THREE.Vector2(11.2, - 50.4), count: 3, spread: 2.4, baseScale: 0.5 },

            // Experience
            { center: new THREE.Vector2(- 24, - 34.4), count: 4, spread: 2.6, baseScale: 0.52 },
            { center: new THREE.Vector2(- 45, - 34.2), count: 4, spread: 2.6, baseScale: 0.52 },
            { center: new THREE.Vector2(- 66, - 34.4), count: 4, spread: 2.6, baseScale: 0.52 },
            { center: new THREE.Vector2(- 75.2, - 53.6), count: 3, spread: 2.2, baseScale: 0.48 },

            // Software
            { center: new THREE.Vector2(22, - 34.8), count: 4, spread: 2.6, baseScale: 0.52 },
            { center: new THREE.Vector2(42.5, - 34.6), count: 4, spread: 2.8, baseScale: 0.52 },
            { center: new THREE.Vector2(62.8, - 34.8), count: 4, spread: 2.6, baseScale: 0.52 },
            { center: new THREE.Vector2(20.5, - 63.8), count: 3, spread: 2.4, baseScale: 0.48 },
            { center: new THREE.Vector2(46.5, - 64.6), count: 4, spread: 2.6, baseScale: 0.5 },
            { center: new THREE.Vector2(65, - 62.8), count: 3, spread: 2.2, baseScale: 0.48 },

            // Talks
            { center: new THREE.Vector2(- 23, - 73.2), count: 4, spread: 2.6, baseScale: 0.52 },
            { center: new THREE.Vector2(0.2, - 72.4), count: 4, spread: 2.8, baseScale: 0.52 },
            { center: new THREE.Vector2(23, - 73.2), count: 4, spread: 2.6, baseScale: 0.52 },
            { center: new THREE.Vector2(- 22, - 96.2), count: 3, spread: 2.4, baseScale: 0.48 },
            { center: new THREE.Vector2(3, - 97.4), count: 4, spread: 2.8, baseScale: 0.5 },
            { center: new THREE.Vector2(26, - 96.2), count: 3, spread: 2.4, baseScale: 0.48 }
        ]

        clusters.forEach((cluster, index) =>
        {
            this.addTreeCluster({
                ...cluster,
                seed: index * 11
            })
        })

        const singles = [
            new THREE.Vector2(- 15.2, - 36.2),
            new THREE.Vector2(15.4, - 35.8),
            new THREE.Vector2(- 15.8, - 52.8),
            new THREE.Vector2(16.4, - 53.2),
            new THREE.Vector2(- 32.8, - 33.8),
            new THREE.Vector2(- 55.8, - 33.6),
            new THREE.Vector2(- 72.4, - 39.8),
            new THREE.Vector2(- 34.5, - 54.8),
            new THREE.Vector2(15.5, - 39.6),
            new THREE.Vector2(33.4, - 35.6),
            new THREE.Vector2(53.5, - 35.4),
            new THREE.Vector2(71.8, - 42.4),
            new THREE.Vector2(33.2, - 66.5),
            new THREE.Vector2(58.5, - 68.6),
            new THREE.Vector2(- 29.2, - 77.2),
            new THREE.Vector2(- 10.6, - 72.8),
            new THREE.Vector2(11.8, - 72.6),
            new THREE.Vector2(30.8, - 77.4),
            new THREE.Vector2(- 30.6, - 93.2),
            new THREE.Vector2(- 8.8, - 99.4),
            new THREE.Vector2(14.5, - 99.2),
            new THREE.Vector2(33.4, - 92.8)
        ]

        singles.forEach((point, index) =>
        {
            if(this.isInsideTextBounds(point) || this.isNearRoute(point, 2.45))
            {
                return
            }

            this.addDecoration({
                type: 'tree',
                x: point.x,
                y: point.y,
                scale: 0.42 + (index % 4) * 0.045,
                rotation: index * 0.39
            })
        })
    }

    addTreeCluster({ center, count, spread, baseScale, seed })
    {
        for(let i = 0; i < count; i++)
        {
            const angle = seed * 0.17 + i * Math.PI * 0.62
            const radius = i === 0 ? 0 : spread * (0.45 + ((seed + i) % 4) * 0.11)
            const point = center.clone().add(new THREE.Vector2(
                Math.cos(angle) * radius,
                Math.sin(angle) * radius
            ))

            if(this.isInsideTextBounds(point) || this.isNearRoute(point, 2.55))
            {
                continue
            }

            this.addDecoration({
                type: 'tree',
                x: point.x,
                y: point.y,
                scale: baseScale * (0.86 + ((seed + i) % 5) * 0.06),
                rotation: seed * 0.31 + i * 0.47
            })
        }
    }

    setRouteGuideWalls()
    {
        this.routeSegments.slice(1).forEach(([from, to], segmentIndex) =>
        {
            if(this.isExperienceBranchSegment(from, to))
            {
                return
            }

            const delta = to.clone().sub(from)
            const distance = delta.length()
            const direction = delta.clone().normalize()
            const tangent = direction.clone().rotateAround(new THREE.Vector2(0, 0), Math.PI * 0.5)
            const angle = direction.angle()
            const count = Math.max(1, Math.floor(distance / 18))

            for(let i = 0; i < count; i++)
            {
                const seed = segmentIndex * 17 + i * 7
                const progress = (i + 0.55) / (count + 0.35)
                const side = segmentIndex === 0 ? 1 : seed % 3 === 0 ? - 1 : 1
                const lateralOffset = 3.05 + (seed % 4) * 0.18
                const forwardJitter = ((seed % 5) - 2) * 0.35
                const wallLength = 2.7 + (seed % 3) * 0.45
                const wallCenter = from.clone()
                    .lerp(to, progress)
                    .add(tangent.clone().multiplyScalar(side * lateralOffset))
                    .add(direction.clone().multiplyScalar(forwardJitter))

                if(wallCenter.distanceTo(this.junction) <= JUNCTION_TILE_GAP + 8)
                {
                    continue
                }

                if(this.isInsideTextBounds(wallCenter))
                {
                    continue
                }

                this.addGuideWall({
                    position: new THREE.Vector3(wallCenter.x, wallCenter.y, 0),
                    length: wallLength,
                    rotation: angle + (((seed % 3) - 1) * 0.08)
                })
            }
        })
    }

    isExperienceBranchSegment(from, to)
    {
        return from.x <= this.junction.x &&
            to.x <= this.junction.x &&
            Math.abs(from.y - this.experiencePoints[0].y) < 3 &&
            Math.abs(to.y - this.experiencePoints[0].y) < 3
    }

    setExperienceGuideWalls()
    {
        const panelHalfWidth = 13.5 * 0.5
        const panelHalfHeight = 8.7 * 0.5
        const outsideY = panelHalfHeight + 1.05
        const outsideX = panelHalfWidth + 1.05
        const [cisco, intern, epicenter] = this.experiencePoints

        this.addGuideWall({
            position: new THREE.Vector3(cisco.x - 0.45, cisco.y + outsideY + 1.85, 0),
            length: 9.4,
            rotation: 0
        })
        this.addGuideWall({
            position: new THREE.Vector3(intern.x - 0.1, intern.y - outsideY, 0),
            length: 8.4,
            rotation: 0
        })
        this.addGuideWall({
            position: new THREE.Vector3(epicenter.x - 0.15, epicenter.y + outsideY, 0),
            length: 10.6,
            rotation: 0
        })
        this.addGuideWall({
            position: new THREE.Vector3(epicenter.x - 0.15, epicenter.y - outsideY, 0),
            length: 10.6,
            rotation: 0
        })
        this.addGuideWall({
            position: new THREE.Vector3(epicenter.x - outsideX - 1.25, epicenter.y + 0.2, 0),
            length: 7.7,
            rotation: Math.PI * 0.5
        })
    }

    setMarkedGuideWalls()
    {
        this.addGuideWall({
            position: new THREE.Vector3(4.6, - 63.4, 0),
            length: 12,
            rotation: Math.PI * 0.5
        })
        this.addGuideWall({
            position: new THREE.Vector3(- 11.8, - 49.9, 0),
            length: 5.8,
            rotation: 0
        })
        this.addGuideWall({
            position: new THREE.Vector3(- 14.55, - 52.65, 0),
            length: 5.8,
            rotation: Math.PI * 0.5
        })
        this.addGuideWall({
            position: new THREE.Vector3(17.5, - 52, 0),
            length: 6.4,
            rotation: 0
        })
    }

    setTalksGuideWalls()
    {
        this.addGuideWall({
            position: new THREE.Vector3(- 11.4, - 90.05, 0),
            length: 12.6,
            rotation: 0
        })
        this.addGuideWall({
            position: new THREE.Vector3(8.7, - 90.05, 0),
            length: 16.2,
            rotation: 0
        })
    }

    addGuideWall({ position, length, rotation })
    {
        const base = new THREE.Object3D()
        const collision = new THREE.Object3D()
        const visual = new THREE.Object3D()
        visual.position.copy(position)
        visual.rotation.z = rotation

        this.buildPlanterWall(visual, length)
        this.addWallRocks(visual, length)

        visual.matrixAutoUpdate = false
        visual.updateMatrix()
        this.container.add(visual)

        const collisionBox = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1))
        collisionBox.name = 'box'
        collisionBox.scale.set(length, 1.08, 0.48)
        collisionBox.position.z = 0.24
        collision.add(collisionBox)

        this.objects.add({
            base,
            collision,
            offset: position,
            rotation: new THREE.Euler(0, 0, rotation),
            mass: 0,
            soundName: 'woodHit'
        })
    }

    buildPlanterWall(container, length)
    {
        const baseMaterial = new THREE.MeshBasicMaterial({ color: 0xffe8c8 })
        const sideMaterial = new THREE.MeshBasicMaterial({ color: 0xe89048 })
        const rimMaterial = new THREE.MeshBasicMaterial({ color: 0xfff4dc })
        const soilMaterial = new THREE.MeshBasicMaterial({ color: 0xcab88e })
        const shrubMaterials = [
            new THREE.MeshBasicMaterial({ color: 0x7bb96d }),
            new THREE.MeshBasicMaterial({ color: 0x5fa65f }),
            new THREE.MeshBasicMaterial({ color: 0x96c86c })
        ]
        const wallWidth = 1.15
        const wallHeight = 0.46
        const middleLength = Math.max(0.1, length - wallWidth)

        const addCapsulePart = ({ target, material, width, height, z, xScale = 1 }) =>
        {
            const partRadius = width * 0.5
            const partMiddleLength = Math.max(0.1, length * xScale - width)
            const center = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material)
            center.scale.set(partMiddleLength, width, height)
            center.position.z = z
            target.add(center)

            ;[- 1, 1].forEach((side) =>
            {
                const cap = new THREE.Mesh(new THREE.CylinderGeometry(partRadius, partRadius, height, 18), material)
                cap.rotation.x = Math.PI * 0.5
                cap.position.set(side * partMiddleLength * 0.5, 0, z)
                target.add(cap)
            })
        }

        addCapsulePart({
            target: container,
            material: baseMaterial,
            width: wallWidth,
            height: wallHeight,
            z: wallHeight * 0.5
        })

        const sideAccent = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), sideMaterial)
        sideAccent.scale.set(middleLength, 0.08, 0.12)
        sideAccent.position.set(0, - wallWidth * 0.5 - 0.015, 0.16)
        container.add(sideAccent)

        addCapsulePart({
            target: container,
            material: rimMaterial,
            width: 0.86,
            height: 0.1,
            z: wallHeight + 0.06,
            xScale: 0.92
        })
        addCapsulePart({
            target: container,
            material: soilMaterial,
            width: 0.58,
            height: 0.06,
            z: wallHeight + 0.13,
            xScale: 0.78
        })

        const shrubCount = Math.max(2, Math.min(6, Math.floor(length / 1.15)))
        for(let i = 0; i < shrubCount; i++)
        {
            const t = shrubCount === 1 ? 0.5 : i / (shrubCount - 1)
            const shrub = new THREE.Mesh(
                new THREE.DodecahedronGeometry(0.34 + (i % 2) * 0.05),
                shrubMaterials[i % shrubMaterials.length]
            )
            shrub.scale.set(1.2, 0.95, 0.7)
            shrub.position.set((t - 0.5) * length * 0.58, (i % 2 === 0 ? - 0.14 : 0.12), wallHeight + 0.36)
            shrub.rotation.set(0.2, - 0.1, i * 0.58)
            container.add(shrub)
        }

        if(length >= 4.6)
        {
            const treePositions = length >= 7 ? [- length * 0.26, length * 0.26] : [0]
            treePositions.forEach((x, index) =>
            {
                const tree = new THREE.Object3D()
                tree.position.set(x, index % 2 === 0 ? 0.12 : - 0.12, wallHeight + 0.03)
                tree.scale.setScalar(0.38)
                tree.rotation.z = index * 0.71
                this.buildTree(tree, index * 0.71 + length)
                container.add(tree)
            })
        }
    }

    addWallRocks(container, length)
    {
        const materials = [
            new THREE.MeshBasicMaterial({ color: 0xa9b0b8 }),
            new THREE.MeshBasicMaterial({ color: 0x8f969f }),
            new THREE.MeshBasicMaterial({ color: 0xc5bdb2 })
        ]
        const rockCount = Math.max(4, Math.min(10, Math.floor(length / 1.6)))

        for(let i = 0; i < rockCount; i++)
        {
            const side = i % 2 === 0 ? - 1 : 1
            const t = rockCount === 1 ? 0.5 : i / (rockCount - 1)
            const xJitter = (((i * 37) % 9) - 4) * 0.08
            const yJitter = (((i * 19) % 7) - 3) * 0.05
            const radius = 0.13 + (i % 3) * 0.035
            const rock = new THREE.Mesh(
                new THREE.DodecahedronGeometry(radius),
                materials[i % materials.length]
            )

            rock.position.set(
                (t - 0.5) * length * 0.86 + xJitter,
                side * (0.82 + (i % 3) * 0.14) + yJitter,
                radius * 0.42
            )
            rock.scale.set(1.25 + (i % 2) * 0.2, 0.82, 0.48)
            rock.rotation.set(0.2, - 0.12, i * 0.67)
            container.add(rock)
        }
    }

    isNearRoute(point, padding)
    {
        return this.routeSegments.some(([from, to]) =>
        {
            const segment = to.clone().sub(from)
            const pointDelta = point.clone().sub(from)
            const segmentLengthSq = segment.lengthSq()
            const t = segmentLengthSq === 0 ? 0 : Math.max(0, Math.min(1, pointDelta.dot(segment) / segmentLengthSq))
            const closest = from.clone().add(segment.multiplyScalar(t))

            return closest.distanceTo(point) < padding
        })
    }

    addGroundPanel({ title, eyebrow, body, lines, chips, position, size, accent, variant })
    {
        const texture = createPanelTexture({
            title,
            eyebrow,
            body,
            lines,
            chips,
            accent,
            variant
        })
        const mesh = new THREE.Mesh(
            new THREE.PlaneGeometry(size.x, size.y),
            new THREE.MeshBasicMaterial({
                map: texture,
                transparent: true,
                depthWrite: false,
                side: THREE.DoubleSide
            })
        )

        mesh.position.copy(position)
        mesh.matrixAutoUpdate = false
        mesh.updateMatrix()
        this.container.add(mesh)

        this.readingZones.push({
            position: position.clone(),
            halfExtents: new THREE.Vector2(
                size.x * 0.5 + READING_CAMERA_PADDING,
                size.y * 0.5 + READING_CAMERA_PADDING
            )
        })
        this.textBounds.push({
            position: position.clone(),
            halfExtents: new THREE.Vector2(size.x * 0.5 + 0.75, size.y * 0.5 + 0.75)
        })
    }

    addLinkButton({ label, href, position, size = new THREE.Vector2(3.4, 1.05) })
    {
        if(!href)
        {
            return
        }

        const buttonScale = 1.16
        const buttonSize = size.clone().multiplyScalar(buttonScale)
        const texture = createLinkButtonTexture({ label })
        const mesh = new THREE.Mesh(
            new THREE.PlaneGeometry(buttonSize.x, buttonSize.y),
            new THREE.MeshBasicMaterial({
                map: texture,
                transparent: true,
                depthWrite: false,
                side: THREE.DoubleSide
            })
        )

        mesh.position.copy(position)
        mesh.matrixAutoUpdate = false
        mesh.updateMatrix()
        this.container.add(mesh)

        const area = this.areas.add({
            position: new THREE.Vector2(position.x, position.y),
            halfExtents: new THREE.Vector2(buttonSize.x * 0.5, buttonSize.y * 0.5)
        })
        area.floorBorder.mesh.visible = false
        area.fence.mesh.visible = false
        if(area.key)
        {
            area.key.icon.material.color = new THREE.Color(THEME.blue)
            area.key.enter.material.color = new THREE.Color(THEME.blue)
        }
        area.floorBorder.material.uniforms.uColor.value = new THREE.Color(THEME.blue)
        area.floorBorder.material.uniforms.uAlpha.value = 0.65
        area.floorBorder.material.uniforms.uProgress.value = 1
        area.fence.material.uniforms.uColor.value = new THREE.Color(THEME.blue)
        area.fence.material.uniforms.uBorderAlpha.value = 0.55
        area.fence.material.uniforms.uStrikeAlpha.value = 0.16
        area.on('interact', () =>
        {
            const openedWindow = window.open(href, '_blank', 'noopener,noreferrer')
            if(openedWindow)
            {
                openedWindow.opener = null
            }
        })

        this.readingZones.push({
            position: position.clone(),
            halfExtents: new THREE.Vector2(
                buttonSize.x * 0.5 + READING_CAMERA_PADDING,
                buttonSize.y * 0.5 + READING_CAMERA_PADDING
            )
        })
        this.textBounds.push({
            position: position.clone(),
            halfExtents: new THREE.Vector2(buttonSize.x * 0.5 + 0.75, buttonSize.y * 0.5 + 0.75)
        })
    }

    addRouteTiles({ start, delta })
    {
        const interDistance = this.tiles.interDistance
        const tangentDistance = this.tiles.tangentDistance
        const distance = delta.length()
        const count = Math.floor(distance / interDistance)
        const directionVector = delta.clone().normalize()
        const interVector = directionVector.clone().multiplyScalar(interDistance)
        const centeringVector = delta.clone().sub(interVector.clone().multiplyScalar(count))
        const tangentVector = directionVector.clone().rotateAround(new THREE.Vector2(0, 0), Math.PI * 0.5).multiplyScalar(tangentDistance)
        const angle = directionVector.angle()

        for(let i = 0; i < count; i++)
        {
            const model = this.tiles.models.pick()
            const position = start.clone().add(interVector.clone().multiplyScalar(i)).add(centeringVector)
            const tangent = tangentVector.clone()

            if(i % 1 === 0)
            {
                tangent.negate()
            }

            position.add(tangent)

            if(position.distanceTo(this.junction) <= JUNCTION_TILE_GAP)
            {
                continue
            }

            if(this.isInsideTextBounds(position))
            {
                continue
            }

            let rotation = angle
            rotation += model.rotationIndex / 4 * Math.PI * 2

            this.objects.add({
                base: model.base,
                collision: model.collision,
                offset: new THREE.Vector3(position.x, position.y, 0),
                rotation: new THREE.Euler(0, 0, rotation),
                duplicated: true,
                mass: 0
            })
        }
    }

    setIntersectionSigns()
    {
        const directions = [
            {
                label: 'EXPERIENCE',
                signboardName: 'signboardExperience',
                target: this.sectionAnchors.experience,
                offset: new THREE.Vector3(- 4.4, 1.75, 0)
            },
            {
                label: 'SOFTWARE',
                signboardName: 'signboardSoftware',
                target: this.sectionAnchors.software,
                offset: new THREE.Vector3(4.6, 1.75, 0)
            },
            {
                label: 'TALKS',
                signboardName: 'signboardTalks',
                target: this.sectionAnchors.talks,
                offset: new THREE.Vector3(0, - 4.05, 0),
                rotationOffset: Math.PI
            }
        ]

        directions.forEach((direction) =>
        {
            const from = this.junction
            const to = new THREE.Vector2(direction.target.x, direction.target.y)
            const angle = to.clone().sub(from).angle()
            this.addDirectionalSign({
                label: direction.label,
                signboardName: direction.signboardName,
                position: new THREE.Vector3(from.x, from.y, 0).add(direction.offset),
                rotation: angle + (direction.rotationOffset || 0)
            })
        })
    }

    addDirectionalSign({ label, signboardName, position, rotation })
    {
        const signboardScene = this.resources?.items?.[signboardName]?.scene
        if(signboardScene)
        {
            this.addImportedDirectionalSign({ signboardScene, position, rotation })
            return
        }

        const group = new THREE.Object3D()
        group.position.copy(position)
        group.rotation.z = rotation

        const postMaterial = new THREE.MeshBasicMaterial({ color: 0x8e7161 })
        const boardMaterial = new THREE.MeshBasicMaterial({ color: 0xf2eadc })
        const edgeMaterial = new THREE.MeshBasicMaterial({ color: 0xd8c7b2 })
        const stoneMaterial = new THREE.MeshBasicMaterial({ color: 0xd8cfc4 })

        const pole = new THREE.Mesh(
            new THREE.CylinderGeometry(0.06, 0.075, 1.65, 8),
            postMaterial
        )
        pole.rotation.x = Math.PI * 0.5
        pole.position.z = 0.82
        group.add(pole)

        const foot = new THREE.Mesh(
            new THREE.BoxGeometry(0.62, 0.62, 0.18),
            boardMaterial
        )
        foot.position.z = 0.08
        group.add(foot)

        const stoneOffsets = [
            new THREE.Vector3(- 0.48, - 0.24, 0.13),
            new THREE.Vector3(0.34, 0.36, 0.1),
            new THREE.Vector3(0.08, - 0.52, 0.08)
        ]

        stoneOffsets.forEach((offset, index) =>
        {
            const stone = new THREE.Mesh(new THREE.DodecahedronGeometry(index === 0 ? 0.18 : 0.12), stoneMaterial)
            stone.scale.set(1.25, 0.85, 0.55)
            stone.position.copy(offset)
            group.add(stone)
        })

        const board = new THREE.Mesh(
            new THREE.BoxGeometry(3.2, 0.14, 0.62),
            boardMaterial
        )
        board.position.set(0.94, 0, 1.62)
        group.add(board)

        const boardEdge = new THREE.Mesh(
            new THREE.BoxGeometry(3.24, 0.04, 0.65),
            edgeMaterial
        )
        boardEdge.position.set(0.94, - 0.09, 1.62)
        group.add(boardEdge)

        const arrow = new THREE.Mesh(
            new THREE.ConeGeometry(0.38, 0.62, 3),
            boardMaterial
        )
        arrow.position.set(2.84, 0, 1.62)
        arrow.rotation.z = - Math.PI * 0.5
        arrow.scale.y = 0.7
        group.add(arrow)

        const texture = this.createSignTexture(label)
        const textMaterial = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            depthTest: false,
            depthWrite: false,
            side: THREE.FrontSide
        })
        const text = new THREE.Mesh(
            new THREE.PlaneGeometry(2.55, 0.46),
            textMaterial
        )
        text.position.set(0.78, - 0.16, 1.63)
        text.rotation.x = Math.PI * 0.5
        text.renderOrder = 10
        group.add(text)

        const backText = new THREE.Mesh(
            new THREE.PlaneGeometry(2.55, 0.46),
            textMaterial.clone()
        )
        backText.position.set(0.78, 0.1, 1.63)
        backText.rotation.x = - Math.PI * 0.5
        backText.renderOrder = 10
        group.add(backText)

        group.updateMatrixWorld()
        this.container.add(group)
        this.addSignboardCollider({ position, rotation })
    }

    addImportedDirectionalSign({ signboardScene, position, rotation })
    {
        const group = new THREE.Object3D()
        const model = signboardScene.clone(true)
        const materialCache = new Map()

        model.traverse((child) =>
        {
            if(!child.isMesh)
            {
                return
            }

            const makeSignMaterial = (material) =>
            {
                const cacheKey = material?.uuid || child.uuid
                if(materialCache.has(cacheKey))
                {
                    return materialCache.get(cacheKey)
                }

                const materialName = `${child.name || ''} ${material?.name || ''}`.toLowerCase()
                let color = 0xf2eadc

                if(materialName.includes('text') || materialName.includes('label') || materialName.includes('font') || materialName.includes('letter'))
                {
                    color = 0x17233f
                }
                else if(materialName.includes('post') || materialName.includes('pole') || materialName.includes('stand') || materialName.includes('support') || materialName.includes('wood'))
                {
                    color = 0x8e7161
                }
                else if(materialName.includes('edge') || materialName.includes('trim') || materialName.includes('side'))
                {
                    color = 0xd8c7b2
                }

                const hasVertexColors = Boolean(child.geometry?.attributes?.color || material?.vertexColors)

                if(material?.map)
                {
                    material.map.colorSpace = THREE.SRGBColorSpace
                    material.map.needsUpdate = true
                }

                if(material?.map || hasVertexColors)
                {
                    color = 0xffffff
                }

                const signMaterial = new THREE.MeshBasicMaterial({
                    color,
                    map: material?.map || null,
                    vertexColors: hasVertexColors,
                    transparent: material?.transparent || false,
                    opacity: material?.opacity ?? 1,
                    side: THREE.DoubleSide
                })

                materialCache.set(cacheKey, signMaterial)
                return signMaterial
            }

            child.material = Array.isArray(child.material)
                ? child.material.map((material) => makeSignMaterial(material))
                : makeSignMaterial(child.material)
            child.castShadow = false
            child.receiveShadow = false
        })

        model.rotation.x = Math.PI * 0.5
        model.updateMatrixWorld(true)

        const box = new THREE.Box3().setFromObject(model)
        const size = box.getSize(new THREE.Vector3())
        const center = box.getCenter(new THREE.Vector3())
        const longestHorizontalEdge = Math.max(size.x, size.y, 0.001)
        const scale = 3.65 / longestHorizontalEdge

        model.position.sub(center)
        model.position.z += size.z * 0.5
        model.scale.setScalar(scale)

        group.position.copy(position)
        group.rotation.z = rotation
        group.add(model)

        const stoneMaterial = new THREE.MeshBasicMaterial({ color: 0xd8cfc4 })
        const stoneOffsets = [
            new THREE.Vector3(- 0.48, - 0.24, 0.13),
            new THREE.Vector3(0.34, 0.36, 0.1),
            new THREE.Vector3(0.08, - 0.52, 0.08)
        ]

        stoneOffsets.forEach((offset, index) =>
        {
            const stone = new THREE.Mesh(new THREE.DodecahedronGeometry(index === 0 ? 0.18 : 0.12), stoneMaterial)
            stone.scale.set(1.25, 0.85, 0.55)
            stone.position.copy(offset)
            group.add(stone)
        })

        this.container.add(group)
        this.addSignboardCollider({ position, rotation })
    }

    addSignboardCollider({ position, rotation })
    {
        const base = new THREE.Object3D()
        const collision = new THREE.Object3D()

        const poleCollider = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1))
        poleCollider.name = 'box'
        poleCollider.scale.set(0.34, 0.34, 1.55)
        poleCollider.position.set(0, 0, 0.85)
        collision.add(poleCollider)

        const boardCollider = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1))
        boardCollider.name = 'box'
        boardCollider.scale.set(2.55, 0.26, 0.48)
        boardCollider.position.set(0.95, 0, 1.62)
        collision.add(boardCollider)

        this.objects.add({
            base,
            collision,
            offset: position,
            rotation: new THREE.Euler(0, 0, rotation),
            mass: 0,
            soundName: 'woodHit'
        })
    }

    addImageBanner({ imageSrc, position, rotation = 0, size })
    {
        const imageTexture = new THREE.TextureLoader().load(imageSrc)
        imageTexture.colorSpace = THREE.SRGBColorSpace
        imageTexture.magFilter = THREE.LinearFilter
        imageTexture.minFilter = THREE.LinearFilter

        this.addMediaBanner({
            texture: imageTexture,
            position,
            rotation,
            size
        })
    }

    createRoundedRectShape(width, height, radius)
    {
        const x = - width * 0.5
        const y = - height * 0.5
        const shape = new THREE.Shape()

        shape.moveTo(x + radius, y)
        shape.lineTo(x + width - radius, y)
        shape.quadraticCurveTo(x + width, y, x + width, y + radius)
        shape.lineTo(x + width, y + height - radius)
        shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
        shape.lineTo(x + radius, y + height)
        shape.quadraticCurveTo(x, y + height, x, y + height - radius)
        shape.lineTo(x, y + radius)
        shape.quadraticCurveTo(x, y, x + radius, y)

        return shape
    }

    addMediaBanner({ texture, position, rotation = 0, size })
    {
        const group = new THREE.Object3D()
        group.position.copy(position)
        group.rotation.z = rotation

        const board = new THREE.Object3D()
        board.position.z = size.y * 0.5 + SOFTWARE_BANNER_LIFT
        board.rotation.x = Math.PI * 0.5
        group.add(board)

        const frameSize = new THREE.Vector2(size.x + 0.62, size.y + 0.46)
        const frameGeometry = new THREE.ExtrudeGeometry(
            this.createRoundedRectShape(frameSize.x, frameSize.y, 0.2),
            {
                depth: 0.16,
                bevelEnabled: true,
                bevelSize: 0.035,
                bevelThickness: 0.035,
                bevelSegments: 2
            }
        )
        frameGeometry.translate(0, 0, - 0.12)

        const frame = new THREE.Mesh(
            frameGeometry,
            new THREE.MeshBasicMaterial({ color: 0xfff0d6 })
        )
        board.add(frame)

        const image = new THREE.Mesh(
            new THREE.PlaneGeometry(size.x - 0.14, size.y - 0.12),
            new THREE.MeshBasicMaterial({
                map: texture,
                side: THREE.DoubleSide
            })
        )
        image.position.z = 0.08
        board.add(image)

        const legMaterial = new THREE.MeshBasicMaterial({ color: 0xd8a36e })
        ;[- 1, 1].forEach((side) =>
        {
            const leg = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.22, 0.78), legMaterial)
            leg.position.set(side * size.x * 0.28, - 0.18, 0.39)
            group.add(leg)
        })

        group.updateMatrixWorld()
        this.container.add(group)
        this.addImageBannerCollider({ position, rotation, size })
    }

    addVideoBanner({ videoSrc, position, rotation = 0, size })
    {
        const video = document.createElement('video')
        video.src = videoSrc
        video.muted = true
        video.loop = true
        video.playsInline = true
        video.autoplay = true
        video.play().catch(() => {})

        const texture = new THREE.VideoTexture(video)
        texture.colorSpace = THREE.SRGBColorSpace
        texture.magFilter = THREE.LinearFilter
        texture.minFilter = THREE.LinearFilter

        this.addMediaBanner({
            texture,
            position,
            rotation,
            size
        })
    }

    addImageBannerCollider({ position, rotation, size })
    {
        const base = new THREE.Object3D()
        const collision = new THREE.Object3D()

        const boardCollider = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1))
        boardCollider.name = 'box'
        boardCollider.scale.set(size.x + 0.85, 0.36, size.y + 0.75)
        boardCollider.position.z = size.y * 0.5 + SOFTWARE_BANNER_LIFT
        collision.add(boardCollider)

        ;[- 1, 1].forEach((side) =>
        {
            const legCollider = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1))
            legCollider.name = 'box'
            legCollider.scale.set(0.26, 0.26, 0.78)
            legCollider.position.set(side * size.x * 0.28, - 0.18, 0.39)
            collision.add(legCollider)
        })

        this.objects.add({
            base,
            collision,
            offset: position,
            rotation: new THREE.Euler(0, 0, rotation),
            mass: 0,
            soundName: 'woodHit'
        })
    }

    createSignTexture(label)
    {
        const canvas = document.createElement('canvas')
        canvas.width = 512
        canvas.height = 128

        const context = canvas.getContext('2d')
        context.clearRect(0, 0, canvas.width, canvas.height)
        context.fillStyle = THEME.ink
        context.font = `900 68px ${BODY_FONT}`
        context.textAlign = 'center'
        context.textBaseline = 'middle'
        context.fillText(label, canvas.width / 2, canvas.height / 2 + 2)

        const texture = new THREE.CanvasTexture(canvas)
        texture.colorSpace = THREE.SRGBColorSpace
        texture.magFilter = THREE.LinearFilter
        texture.minFilter = THREE.LinearFilter
        texture.needsUpdate = true

        return texture
    }

    isInsideTextBounds(position)
    {
        return this.textBounds.some((bounds) =>
            Math.abs(position.x - bounds.position.x) <= bounds.halfExtents.x &&
            Math.abs(position.y - bounds.position.y) <= bounds.halfExtents.y
        )
    }

    setReadingCamera()
    {
        this.time.on('tick', () =>
        {
            const carPosition = this.car.position
            const isReading = this.readingZones.some((zone) =>
                Math.abs(carPosition.x - zone.position.x) <= zone.halfExtents.x &&
                Math.abs(carPosition.y - zone.position.y) <= zone.halfExtents.y
            )

            if(isReading && !this.readingCameraActive)
            {
                this.readingCameraActive = true
                this.camera.angle.set('projects')
                this.camera.zoom.targetValue = 0.95
                this.camera.pan.reset()
            }
            else if(!isReading && this.readingCameraActive)
            {
                this.readingCameraActive = false
                this.camera.angle.set('default')
                this.camera.zoom.targetValue = this.defaultZoomTarget
                this.camera.pan.reset()
            }
        })
    }

    addSectionHeader({ title, position, scale = new THREE.Vector3(5.8, 1.18, 0.55) })
    {
        this.addSignpost({
            title,
            position,
            scale
        })
    }

    addSignpost({ title, position, scale })
    {
        this.add3DHeading({
            title,
            position,
            scale,
            materialName: 'Black',
            preserveCase: true,
            mass: 8,
            sleep: false,
            shadow: {
                sizeX: 6.2,
                sizeY: 1.45,
                offsetZ: - 0.2,
                alpha: 0.35
            }
        })
    }

    add3DHeading({ title, position, scale, materialName, preserveCase = false, mass = 0, sleep = true, shadow = null })
    {
        if(mass > 0)
        {
            this.addIndependentTextLetters({
                title,
                position,
                scale,
                materialName,
                preserveCase,
                mass,
                sleep,
                shadow
            })
            return
        }

        const base = new THREE.Object3D()
        const collision = new THREE.Object3D()

        this.addContinuousText({
            base,
            title,
            materialName,
            scale,
            z: 0,
            preserveCase
        })

        const collisionBox = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1))
        collisionBox.name = 'box'
        collisionBox.scale.set(scale.x * 1.08, 1.05, scale.y * 1.48)
        collisionBox.position.z = scale.y * 0.74
        collision.add(collisionBox)

        this.objects.add({
            base,
            collision,
            offset: position,
            mass,
            sleep,
            shadow,
            soundName: 'woodHit'
        })
    }

    addIndependentTextLetters({ title, position, scale, materialName, preserveCase = false, mass, sleep, shadow })
    {
        const normalizedTitle = (preserveCase ? title : title.toUpperCase()).replace(/[^a-zA-Z ]/g, '')
        const letterSpacing = 0.08
        const spaceWidth = 0.46
        const letters = []
        let layoutWidth = 0
        let maxHeight = 0

        for(const character of normalizedTitle)
        {
            if(character === ' ')
            {
                letters.push({
                    character,
                    width: spaceWidth,
                    height: 1,
                    geometry: null,
                    bounds: null
                })
                layoutWidth += spaceWidth + letterSpacing
                continue
            }

            const geometry = new TextGeometry(character, {
                font: TEXT_FONT,
                size: 1,
                depth: 0.55,
                curveSegments: 5,
                bevelEnabled: true,
                bevelThickness: 0.04,
                bevelSize: 0.03,
                bevelSegments: 1
            })
            geometry.computeBoundingBox()

            const bounds = geometry.boundingBox
            const letterWidth = bounds.max.x - bounds.min.x
            const letterHeight = bounds.max.y - bounds.min.y

            letters.push({
                character,
                width: letterWidth,
                height: letterHeight,
                geometry,
                bounds
            })
            layoutWidth += letterWidth + letterSpacing
            maxHeight = Math.max(maxHeight, letterHeight)
        }

        layoutWidth = Math.max(layoutWidth - letterSpacing, 1)

        const targetWidth = scale.x * 1.1
        const targetHeight = scale.y * 1.45
        const textScale = Math.min(targetWidth / layoutWidth, targetHeight / Math.max(maxHeight, 1))
        let cursorX = - layoutWidth * textScale * 0.5

        letters.forEach((letter) =>
        {
            const letterWidth = letter.width * textScale

            if(!letter.geometry)
            {
                cursorX += letterWidth + letterSpacing * textScale
                return
            }

            const base = new THREE.Object3D()
            const collision = new THREE.Object3D()
            const mesh = new THREE.Mesh(letter.geometry)
            const letterHeight = letter.height * textScale

            mesh.name = `shade${materialName}`
            mesh.scale.setScalar(textScale)
            mesh.position.set(
                - (letter.bounds.min.x + letter.width * 0.5) * textScale,
                0,
                0
            )
            mesh.rotation.x = Math.PI * 0.5
            base.add(mesh)

            const collisionBox = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1))
            collisionBox.name = 'box'
            collisionBox.scale.set(
                Math.max(letterWidth * 1.16, 0.38),
                1.05,
                Math.max(letterHeight * 1.48, scale.y * 0.62)
            )
            collisionBox.position.z = collisionBox.scale.z * 0.5
            collision.add(collisionBox)

            const letterPosition = position.clone().add(new THREE.Vector3(
                cursorX + letterWidth * 0.5,
                0,
                0
            ))
            const letterShadow = shadow ? {
                ...shadow,
                sizeX: Math.max(letterWidth * 1.22, 0.72),
                sizeY: Math.min(shadow.sizeY || 1.2, 1.35)
            } : null

            this.objects.add({
                base,
                collision,
                offset: letterPosition,
                mass,
                sleep,
                shadow: letterShadow,
                soundName: 'woodHit'
            })

            cursorX += letterWidth + letterSpacing * textScale
        })
    }

    addContinuousText({ base, title, materialName, scale, z, preserveCase = false })
    {
        const normalizedTitle = (preserveCase ? title : title.toUpperCase()).replace(/[^a-zA-Z ]/g, '')
        const geometry = new TextGeometry(normalizedTitle, {
            font: TEXT_FONT,
            size: 1,
            depth: 0.55,
            curveSegments: 5,
            bevelEnabled: true,
            bevelThickness: 0.04,
            bevelSize: 0.03,
            bevelSegments: 1
        })
        geometry.computeBoundingBox()

        const bounds = geometry.boundingBox
        const textWidth = bounds.max.x - bounds.min.x
        const textHeight = bounds.max.y - bounds.min.y
        const targetWidth = scale.x * 1.1
        const targetHeight = scale.y * 1.45
        const textScale = Math.min(targetWidth / textWidth, targetHeight / textHeight)
        const mesh = new THREE.Mesh(geometry)

        mesh.name = `shade${materialName}`
        mesh.scale.setScalar(textScale)
        mesh.position.set(
            - textWidth * textScale * 0.5,
            0,
            z
        )
        mesh.rotation.x = Math.PI * 0.5
        base.add(mesh)
    }

    addInitialsBlock({ initials, position, accentKey })
    {
        this.addLowBlock({
            position,
            scale: new THREE.Vector3(4, 4, 3.2),
            materialName: 'Purple'
        })
        this.addGroundPanel({
            title: initials,
            eyebrow: aboutContent.imageAriaLabel,
            body: 'The same initials mark from the HTML about section, now as a drive-by landmark.',
            position: position.clone().add(new THREE.Vector3(0, - 5.6, 0.04)),
            size: new THREE.Vector2(9, 4.4),
            accent: THEME[accentKey] || THEME.accent
        })
    }

    addDecoration({ type, x, y, rotation, scale })
    {
        const group = new THREE.Object3D()
        group.position.set(x, y, 0)
        group.rotation.z = rotation
        group.scale.setScalar(scale)

        if(type === 'tree')
        {
            this.buildTree(group, rotation)
            this.addTreeCollider({ x, y, rotation, scale })
        }

        group.matrixAutoUpdate = false
        group.updateMatrix()
        this.container.add(group)
    }

    addTreeCollider({ x, y, rotation, scale })
    {
        const base = new THREE.Object3D()
        const collision = new THREE.Object3D()

        const collisionBox = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1))
        collisionBox.name = 'box'
        collisionBox.scale.set(1.15 * scale, 1.15 * scale, 2.45 * scale)
        collisionBox.position.z = 1.25 * scale
        collision.add(collisionBox)

        this.objects.add({
            base,
            collision,
            offset: new THREE.Vector3(x, y, 0),
            rotation: new THREE.Euler(0, 0, rotation),
            mass: 0,
            soundName: 'woodHit'
        })
    }

    buildTree(group, seed = 0)
    {
        const trunkMaterial = new THREE.MeshBasicMaterial({ color: 0xbf6d4c })
        const greenPalettes = [
            { side: 0x1f5f35, main: 0x2f7f46, top: 0x4fa65a },
            { side: 0x3f7f46, main: 0x55a868, top: 0x79c66a },
            { side: 0x5f7f22, main: 0x8fbf55, top: 0xc8df65 },
            { side: 0x6a8f1e, main: 0xb7cf3e, top: 0xe0ea5b },
            { side: 0x1f6f63, main: 0x2f9f84, top: 0x58c9a3 },
            { side: 0x2d6650, main: 0x4f8f68, top: 0x7bbf86 }
        ]
        const palette = greenPalettes[Math.abs(Math.floor(Math.sin(seed * 12.9898) * 43758.5453)) % greenPalettes.length]
        const crownMaterial = new THREE.MeshBasicMaterial({ color: palette.main })
        const crownSideMaterial = new THREE.MeshBasicMaterial({ color: palette.side })
        const crownHighlightMaterial = new THREE.MeshBasicMaterial({ color: palette.top })

        const trunk = new THREE.Mesh(
            new THREE.CylinderGeometry(0.08, 0.12, 1.05, 5),
            trunkMaterial
        )
        trunk.position.set(0, 0, 0.52)
        trunk.rotation.x = Math.PI * 0.5
        group.add(trunk)

        const lowerCrown = new THREE.Mesh(
            new THREE.DodecahedronGeometry(0.82),
            crownSideMaterial
        )
        lowerCrown.scale.set(0.78, 0.72, 1.15)
        lowerCrown.position.set(0, 0, 1.18)
        lowerCrown.rotation.set(0.18, - 0.12, 0.25)
        group.add(lowerCrown)

        const mainCrown = new THREE.Mesh(
            new THREE.DodecahedronGeometry(1),
            crownMaterial
        )
        mainCrown.scale.set(0.9, 0.82, 1.55)
        mainCrown.position.set(0.03, 0, 1.88)
        mainCrown.rotation.set(0.1, - 0.18, 0.16)
        group.add(mainCrown)

        const topCrown = new THREE.Mesh(
            new THREE.DodecahedronGeometry(0.68),
            crownHighlightMaterial
        )
        topCrown.scale.set(0.72, 0.66, 1.08)
        topCrown.position.set(- 0.02, 0.02, 2.6)
        topCrown.rotation.set(- 0.12, 0.08, 0.32)
        group.add(topCrown)
    }

    addJumpRamp({ position, rotation })
    {
        const base = new THREE.Object3D()
        const collision = new THREE.Object3D()
        const rampRotation = new THREE.Euler(- 0.46, 0, rotation)

        const ramp = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1))
        ramp.name = 'shadeOrange'
        ramp.scale.set(4.2, 5.4, 0.34)
        ramp.position.z = 0.24
        base.add(ramp)

        const top = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1))
        top.name = 'shadeWhite'
        top.scale.set(3.55, 4.65, 0.08)
        top.position.z = 0.46
        base.add(top)

        const collisionBox = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1))
        collisionBox.name = 'box'
        collisionBox.scale.copy(ramp.scale)
        collisionBox.position.copy(ramp.position)
        collision.add(collisionBox)

        this.objects.add({
            base,
            collision,
            offset: position,
            rotation: rampRotation,
            mass: 0,
            soundName: 'woodHit'
        })
    }

    addLowBlock({ position, scale, materialName })
    {
        const base = new THREE.Object3D()
        const collision = new THREE.Object3D()

        const markerScale = Math.max(scale.x, scale.y, 0.8) * 0.72
        const poleHeight = 0.9 + scale.z * 0.2
        const poleRadius = 0.075 * markerScale
        const flagWidth = 0.64 * markerScale
        const flagHeight = 0.32 + scale.z * 0.055

        const pole = new THREE.Mesh(new THREE.CylinderGeometry(poleRadius, poleRadius * 1.08, poleHeight, 10))
        pole.name = 'shadeBrown'
        pole.rotation.x = Math.PI * 0.5
        pole.position.z = poleHeight * 0.5
        base.add(pole)

        const flag = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1))
        flag.name = 'shadeBlue'
        flag.scale.set(flagWidth, 0.08, flagHeight)
        flag.position.set(flagWidth * 0.5, 0, poleHeight - flagHeight * 0.45)
        base.add(flag)

        const flagTip = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1))
        flagTip.name = `shade${materialName}`
        flagTip.scale.set(flagWidth * 0.18, 0.09, flagHeight * 0.95)
        flagTip.position.set(flagWidth * 0.98, 0, flag.position.z)
        flagTip.rotation.z = - Math.PI * 0.08
        base.add(flagTip)

        const collisionBox = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1))
        collisionBox.name = 'box'
        collisionBox.scale.set(flagWidth + poleRadius * 2, 0.28, poleHeight)
        collisionBox.position.set(flagWidth * 0.5, 0, poleHeight * 0.5)
        collision.add(collisionBox)

        this.objects.add({
            base,
            collision,
            offset: position,
            rotation: new THREE.Euler(0, 0, - Math.PI * 0.08),
            mass: 0
        })
    }

    addRoute({ from, to, width, material, z })
    {
        const delta = to.clone().sub(from)
        const center = from.clone().add(delta.clone().multiplyScalar(0.5))
        const length = delta.length()
        const mesh = new THREE.Mesh(
            new THREE.PlaneGeometry(length, width),
            material
        )

        mesh.position.set(center.x, center.y, z)
        mesh.rotation.z = delta.angle()
        mesh.matrixAutoUpdate = false
        mesh.updateMatrix()
        this.container.add(mesh)
    }
}
