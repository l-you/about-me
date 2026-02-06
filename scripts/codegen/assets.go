package main

import (
	"fmt"
	"image"
	"image/color"
	"image/draw"
	"image/png"
	"math"
	"os"
	"path/filepath"
	"strings"

	xdraw "golang.org/x/image/draw"
	"golang.org/x/image/font"
	"golang.org/x/image/font/opentype"
	"golang.org/x/image/math/fixed"
)

type palette struct {
	bg struct {
		base   color.Color
		subtle color.Color
		muted  color.Color
	}
	text struct {
		primary   color.Color
		secondary color.Color
		muted     color.Color
	}
	border struct {
		def    color.Color
		strong color.Color
		subtle color.Color
	}
	shadow struct {
		soft   color.NRGBA
		medium color.NRGBA
		strong color.NRGBA
	}
	accent struct {
		bg  color.Color
		dot color.Color
	}
}

func (g *generator) generateAssets() error {
	fmt.Println("[codegen] generating visual assets")

	fontRegular := filepath.Join(g.root, "assets", "fonts", "DejaVuSans.ttf")
	fontBold := filepath.Join(g.root, "assets", "fonts", "DejaVuSans-Bold.ttf")
	pal := defaultPalette()

	if err := g.generateOGImage(pal, fontRegular, fontBold); err != nil {
		return err
	}
	if err := g.generateFavicons(); err != nil {
		return err
	}
	if err := g.generateSafariPinnedTab(); err != nil {
		return err
	}

	return nil
}

func defaultPalette() palette {
	p := palette{}
	p.bg.base = hexColor("#ffffff")
	p.bg.subtle = hexColor("#fafafa")
	p.bg.muted = hexColor("#f5f5f5")

	p.text.primary = hexColor("#171717")
	p.text.secondary = hexColor("#404040")
	p.text.muted = hexColor("#737373")

	p.border.def = hexColor("#e5e5e5")
	p.border.strong = hexColor("#d4d4d4")
	p.border.subtle = hexColor("#f5f5f5")

	p.shadow.soft = color.NRGBA{R: 0, G: 0, B: 0, A: 15}
	p.shadow.medium = color.NRGBA{R: 0, G: 0, B: 0, A: 26}
	p.shadow.strong = color.NRGBA{R: 0, G: 0, B: 0, A: 38}

	p.accent.bg = hexColor("#f5f5f5")
	p.accent.dot = hexColor("#3b82f6")
	return p
}

func (g *generator) generateOGImage(pal palette, fontRegularPath, fontBoldPath string) error {
	avatarPath := filepath.Join(g.root, "public", "avatar.png")
	avatar, err := loadPNG(avatarPath)
	if err != nil {
		return fmt.Errorf("read avatar for OG image: %w", err)
	}

	img := image.NewRGBA(image.Rect(0, 0, 1200, 630))
	fillRect(img, 0, 0, 1200, 630, pal.bg.base)
	applyRadialGradient(img, 240, 315, 600, 8)

	avatarSize := 320.0
	avatarX := 240.0
	avatarY := 315.0

	drawSoftShadowCircle(img, avatarX, avatarY+12, avatarSize/2, pal.shadow.strong, 10, 2)
	drawSoftShadowCircle(img, avatarX, avatarY+4, avatarSize/2-4, pal.shadow.soft, 12, 2)

	innerSize := int(avatarSize - 20)
	avatarScaled := resizeImage(avatar, innerSize, innerSize)
	maskCircle(img, avatarScaled, int(avatarX), int(avatarY), int(avatarSize/2-10))
	drawCircleStroke(img, avatarX, avatarY, avatarSize/2-10, 3, pal.border.strong)

	bold84, err := loadFontFace(fontBoldPath, 84)
	if err != nil {
		return fmt.Errorf("load bold 84 font: %w", err)
	}
	defer closeFontFace(bold84)

	regular42, err := loadFontFace(fontRegularPath, 42)
	if err != nil {
		return fmt.Errorf("load regular 42 font: %w", err)
	}
	defer closeFontFace(regular42)

	bold26, err := loadFontFace(fontBoldPath, 26)
	if err != nil {
		return fmt.Errorf("load bold 26 font: %w", err)
	}
	defer closeFontFace(bold26)

	bold28, err := loadFontFace(fontBoldPath, 28)
	if err != nil {
		return fmt.Errorf("load bold 28 font: %w", err)
	}
	defer closeFontFace(bold28)

	textStartX := 520.0
	textStartY := 200.0

	drawText(img, bold84, pal.text.primary, textStartX, textStartY, g.cfg.Site.Nickname)
	drawText(img, regular42, pal.text.secondary, textStartX, textStartY+100, g.cfg.Site.Title)

	drawLine(img, textStartX, textStartY+165, textStartX+520, textStartY+165, 2, pal.border.def)

	techStackRow1 := []string{"Go", "PHP", "React"}
	techStackRow2 := []string{"TypeScript"}
	techY := textStartY + 200
	techSpacing := 145.0
	rowSpacing := 55.0

	drawPill := func(label string, x, y float64) {
		textWidth := measureTextWidth(bold26, label)
		textHeight := measureTextHeight(bold26)
		dotSize := 8.0
		dotMarginLeft := 12.0
		dotMarginRight := 8.0
		textPaddingRight := 14.0
		pillWidth := dotMarginLeft + dotSize + dotMarginRight + textWidth + textPaddingRight
		pillHeight := 40.0

		fillRoundedRect(img, x, y+2, pillWidth, pillHeight, 20, pal.shadow.soft)
		strokeRoundedRect(img, x, y, pillWidth, pillHeight, 20, 1, pal.border.def, pal.accent.bg)

		fillCircle(img, x+dotMarginLeft+dotSize/2, y+pillHeight/2, dotSize/2, pal.accent.dot)

		textX := x + dotMarginLeft + dotSize + dotMarginRight
		textY := y + (pillHeight-textHeight)/2
		drawText(img, bold26, pal.text.secondary, textX, textY, label)
	}

	for i, tech := range techStackRow1 {
		drawPill(tech, textStartX+float64(i)*techSpacing, techY)
	}
	for i, tech := range techStackRow2 {
		drawPill(tech, textStartX+float64(i)*techSpacing, techY+rowSpacing)
	}

	domainY := 525.0
	domainText := strings.TrimPrefix(g.cfg.Site.Domain, "https://")
	textWidth := measureTextWidth(bold28, domainText)
	textHeight := measureTextHeight(bold28)
	cardX := textStartX - 16
	cardY := domainY - 10
	cardW := textWidth + 32
	cardH := 50.0

	fillRoundedRect(img, cardX, cardY+4, cardW, cardH, 10, pal.shadow.medium)
	strokeRoundedRect(img, cardX, cardY, cardW, cardH, 10, 1, pal.border.def, pal.bg.base)

	textY := domainY + (cardH-textHeight)/2 + 3
	drawText(img, bold28, pal.text.primary, textStartX, textY, domainText)

	if err := savePNG(filepath.Join(g.root, "public", "og-image.png"), img); err != nil {
		return fmt.Errorf("save og-image.png: %w", err)
	}

	fmt.Println("[codegen] generated og-image.png")
	return nil
}

func (g *generator) generateFavicons() error {
	avatarPath := filepath.Join(g.root, "public", "avatar.png")
	avatar, err := loadPNG(avatarPath)
	if err != nil {
		return fmt.Errorf("read avatar for favicons: %w", err)
	}

	sizes := []struct {
		name string
		size int
	}{
		{name: "favicon-16x16.png", size: 16},
		{name: "favicon-32x32.png", size: 32},
		{name: "apple-touch-icon.png", size: 180},
		{name: "android-chrome-192x192.png", size: 192},
		{name: "android-chrome-512x512.png", size: 512},
		{name: "mstile-150x150.png", size: 150},
	}

	for _, item := range sizes {
		resized := resizeImage(avatar, item.size, item.size)
		if err := savePNG(filepath.Join(g.root, "public", item.name), resized); err != nil {
			return fmt.Errorf("save %s: %w", item.name, err)
		}
	}

	fmt.Println("[codegen] generated favicon suite")
	return nil
}

func (g *generator) generateSafariPinnedTab() error {
	svg := `<?xml version="1.0" encoding="UTF-8"?>
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" fill="#000"/>
  <path d="M 150 100 L 230 100 L 230 380 L 370 380 L 370 460 L 150 460 Z" fill="#FFF"/>
</svg>`

	if err := writeFileAtomically(filepath.Join(g.root, "public", "safari-pinned-tab.svg"), []byte(svg), 0o644); err != nil {
		return fmt.Errorf("save safari-pinned-tab.svg: %w", err)
	}

	fmt.Println("[codegen] generated safari-pinned-tab.svg")
	return nil
}

func loadPNG(path string) (image.Image, error) {
	f, err := os.Open(path)
	if err != nil {
		return nil, err
	}
	defer f.Close()
	return png.Decode(f)
}

func savePNG(path string, img image.Image) error {
	f, err := os.Create(path)
	if err != nil {
		return err
	}
	defer f.Close()
	return png.Encode(f, img)
}

func resizeImage(src image.Image, width, height int) image.Image {
	dst := image.NewRGBA(image.Rect(0, 0, width, height))
	xdraw.CatmullRom.Scale(dst, dst.Bounds(), src, src.Bounds(), draw.Over, nil)
	return dst
}

func applyRadialGradient(img *image.RGBA, cx, cy, radius float64, maxAlpha uint8) {
	bounds := img.Bounds()
	for y := bounds.Min.Y; y < bounds.Max.Y; y++ {
		for x := bounds.Min.X; x < bounds.Max.X; x++ {
			dx := float64(x) - cx
			dy := float64(y) - cy
			dist := math.Hypot(dx, dy)
			t := dist / radius
			if t < 0 {
				t = 0
			}
			if t > 1 {
				t = 1
			}
			alpha := uint8(math.Round(float64(maxAlpha) * t))
			if alpha == 0 {
				continue
			}
			blendPixel(img, x, y, color.NRGBA{R: 0, G: 0, B: 0, A: alpha})
		}
	}
}

func maskCircle(dst *image.RGBA, src image.Image, cx, cy, radius int) {
	bounds := src.Bounds()
	startX := cx - bounds.Dx()/2
	startY := cy - bounds.Dy()/2
	r2 := float64(radius * radius)

	for y := 0; y < bounds.Dy(); y++ {
		for x := 0; x < bounds.Dx(); x++ {
			dx := float64(startX+x-cx)
			dy := float64(startY+y-cy)
			if dx*dx+dy*dy > r2 {
				continue
			}

			px := startX + x
			py := startY + y
			if !image.Pt(px, py).In(dst.Bounds()) {
				continue
			}
			dst.Set(px, py, src.At(bounds.Min.X+x, bounds.Min.Y+y))
		}
	}
}

func drawSoftShadowCircle(img *image.RGBA, cx, cy, radius float64, base color.NRGBA, layers int, spread float64) {
	for i := layers; i >= 1; i-- {
		alpha := uint8(math.Round(float64(base.A) * (float64(i) / float64(layers))))
		col := color.NRGBA{R: base.R, G: base.G, B: base.B, A: alpha}
		fillCircle(img, cx, cy, radius+float64(i)*spread, col)
	}
}

func drawCircleStroke(img *image.RGBA, cx, cy, radius, width float64, col color.Color) {
	outer := radius + width/2
	inner := radius - width/2
	for y := int(cy - outer - 1); y <= int(cy+outer+1); y++ {
		for x := int(cx - outer - 1); x <= int(cx+outer+1); x++ {
			dx := float64(x) - cx
			dy := float64(y) - cy
			d := math.Hypot(dx, dy)
			if d < inner || d > outer {
				continue
			}
			alpha := edgeAlpha(d, inner, outer)
			if alpha <= 0 {
				continue
			}
			blendPixel(img, x, y, applyAlpha(col, alpha))
		}
	}
}

func fillRoundedRect(img *image.RGBA, x, y, w, h, r float64, col color.Color) {
	if w <= 0 || h <= 0 {
		return
	}
	r = math.Min(r, math.Min(w/2, h/2))

	fillRectBlend(img, int(x+r), int(y), int(w-2*r), int(h), col)
	fillRectBlend(img, int(x), int(y+r), int(r), int(h-2*r), col)
	fillRectBlend(img, int(x+w-r), int(y+r), int(r), int(h-2*r), col)

	fillCircle(img, x+r, y+r, r, col)
	fillCircle(img, x+w-r, y+r, r, col)
	fillCircle(img, x+r, y+h-r, r, col)
	fillCircle(img, x+w-r, y+h-r, r, col)
}

func strokeRoundedRect(img *image.RGBA, x, y, w, h, r, line float64, stroke, fill color.Color) {
	fillRoundedRect(img, x, y, w, h, r, stroke)
	fillRoundedRect(img, x+line, y+line, w-2*line, h-2*line, r-line, fill)
}

func fillCircle(img *image.RGBA, cx, cy, r float64, col color.Color) {
	minX := int(cx - r - 1)
	maxX := int(cx + r + 1)
	minY := int(cy - r - 1)
	maxY := int(cy + r + 1)
	rInner := r - 0.5
	rOuter := r + 0.5

	for y := minY; y <= maxY; y++ {
		for x := minX; x <= maxX; x++ {
			dx := float64(x) - cx
			dy := float64(y) - cy
			d := math.Hypot(dx, dy)
			if d <= rInner {
				blendPixel(img, x, y, col)
				continue
			}
			if d <= rOuter {
				alpha := (rOuter - d) / (rOuter - rInner)
				blendPixel(img, x, y, applyAlpha(col, alpha))
			}
		}
	}
}

func drawLine(img *image.RGBA, x1, y1, x2, y2, width float64, col color.Color) {
	steps := int(math.Max(math.Abs(x2-x1), math.Abs(y2-y1)))
	if steps == 0 {
		fillCircle(img, x1, y1, width/2, col)
		return
	}

	for i := 0; i <= steps; i++ {
		t := float64(i) / float64(steps)
		x := x1 + (x2-x1)*t
		y := y1 + (y2-y1)*t
		fillCircle(img, x, y, width/2, col)
	}
}

func fillRect(img *image.RGBA, x, y, w, h int, col color.Color) {
	rect := image.Rect(x, y, x+w, y+h)
	draw.Draw(img, rect, &image.Uniform{C: col}, image.Point{}, draw.Src)
}

func fillRectBlend(img *image.RGBA, x, y, w, h int, col color.Color) {
	for yy := y; yy < y+h; yy++ {
		for xx := x; xx < x+w; xx++ {
			blendPixel(img, xx, yy, col)
		}
	}
}

func drawText(img *image.RGBA, face font.Face, col color.Color, x, y float64, text string) {
	d := font.Drawer{
		Dst:  img,
		Src:  image.NewUniform(col),
		Face: face,
	}
	metrics := face.Metrics()
	d.Dot = fixed.Point26_6{
		X: fixed.I(int(math.Round(x))),
		Y: fixed.I(int(math.Round(y))) + metrics.Ascent,
	}
	d.DrawString(text)
}

func measureTextWidth(face font.Face, text string) float64 {
	d := font.Drawer{Face: face}
	return float64(d.MeasureString(text).Ceil())
}

func measureTextHeight(face font.Face) float64 {
	metrics := face.Metrics()
	return float64((metrics.Ascent + metrics.Descent).Ceil())
}

func loadFontFace(path string, size float64) (font.Face, error) {
	data, err := os.ReadFile(path)
	if err != nil {
		return nil, err
	}
	parsed, err := opentype.Parse(data)
	if err != nil {
		return nil, err
	}
	return opentype.NewFace(parsed, &opentype.FaceOptions{
		Size:    size,
		DPI:     72,
		Hinting: font.HintingFull,
	})
}

func closeFontFace(face font.Face) {
	if closer, ok := face.(interface{ Close() error }); ok {
		_ = closer.Close()
	}
}

func blendPixel(img *image.RGBA, x, y int, col color.Color) {
	if !image.Pt(x, y).In(img.Bounds()) {
		return
	}

	src := color.NRGBAModel.Convert(col).(color.NRGBA)
	if src.A == 0 {
		return
	}
	if src.A == 255 {
		img.SetRGBA(x, y, color.RGBA{R: src.R, G: src.G, B: src.B, A: 255})
		return
	}

	dst := img.RGBAAt(x, y)
	sa := uint32(src.A)
	invA := 255 - sa
	sr := uint32(src.R) * sa / 255
	sg := uint32(src.G) * sa / 255
	sb := uint32(src.B) * sa / 255

	outR := sr + uint32(dst.R)*uint32(invA)/255
	outG := sg + uint32(dst.G)*uint32(invA)/255
	outB := sb + uint32(dst.B)*uint32(invA)/255
	outA := sa + uint32(dst.A)*uint32(invA)/255

	img.SetRGBA(x, y, color.RGBA{R: uint8(outR), G: uint8(outG), B: uint8(outB), A: uint8(outA)})
}

func applyAlpha(col color.Color, alpha float64) color.Color {
	src := color.NRGBAModel.Convert(col).(color.NRGBA)
	a := float64(src.A) * alpha
	return color.NRGBA{R: src.R, G: src.G, B: src.B, A: uint8(clamp(a, 0, 255))}
}

func edgeAlpha(d, inner, outer float64) float64 {
	if d < inner {
		return 1
	}
	if d > outer {
		return 0
	}
	span := outer - inner
	if span <= 0 {
		return 0
	}
	return 1 - (d-inner)/span
}

func clamp(value, min, max float64) float64 {
	if value < min {
		return min
	}
	if value > max {
		return max
	}
	return value
}

func hexColor(hex string) color.Color {
	hex = strings.TrimPrefix(hex, "#")
	if len(hex) != 6 {
		return color.Black
	}
	var r, g, b uint8
	_, _ = fmt.Sscanf(hex, "%02x%02x%02x", &r, &g, &b)
	return color.NRGBA{R: r, G: g, B: b, A: 255}
}
