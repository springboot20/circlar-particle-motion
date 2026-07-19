## Circular Particle Motion

An HTML5 Canvas particle system where colored particles orbit a shared center point in stable, concentric rings — built from scratch with vanilla JavaScript and trigonometry, no animation libraries.

Each particle is assigned a fixed orbit radius and angular velocity, then positioned every frame using absolute polar coordinates (`center + cos/sin(angle) * radius`) rather than a recursive "walk" — this keeps every ring perfectly stable indefinitely instead of drifting or pulsing over time. Short trailing line segments (redrawn each frame between the previous and current position) create a dashed, comet-like trail effect, layered across multiple randomized color palettes for visual variety.

### Key Technical Details

- **Retina/high-DPI aware** — canvas backing store and context transform scaled to `devicePixelRatio`, decoupled from CSS pixel dimensions
- **Responsive** via `ResizeObserver`, with clean particle re-initialization on container resize
- **Trail-fade effect** achieved with a semi-transparent `fillRect` overlay each animation frame instead of a full canvas clear
- **Zero dependencies** — pure Canvas 2D API and `requestAnimationFrame`

### Stack

`JavaScript` · `HTML5 Canvas`
