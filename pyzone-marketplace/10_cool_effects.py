import pygame
import math
import sys

pygame.init()

# ---------------- WINDOW ----------------
WIDTH, HEIGHT = 700, 700
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("10 Cool Effects")
clock = pygame.time.Clock()

# ---------------- COLORS ----------------
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
GRAY = (150, 150, 150)

center = WIDTH // 2, HEIGHT // 2
angle = 0
mode = 0  # current effect

font = pygame.font.SysFont("arial", 24, bold=True)

# ---------------- EFFECTS ----------------
def effect_rotating_dots():
    for r in range(50, 300, 25):
        for i in range(12):
            a = angle + i * (2 * math.pi / 12)
            x = center[0] + math.cos(a) * r
            y = center[1] + math.sin(a) * r
            pygame.draw.circle(screen, WHITE, (int(x), int(y)), 4)

def effect_text_wave():
    for i in range(20):
        x = 80 + i * 30
        y = center[1] + math.sin(angle + i * 0.4) * 80
        text = font.render("$", True, WHITE)
        screen.blit(text, (x, y))

def effect_tunnel():
    for r in range(20, 350, 20):
        size = int(4 + 4 * math.sin(angle + r * 0.05))
        pygame.draw.circle(screen, WHITE, center, r, size)

def effect_spiral():
    for i in range(200):
        a = angle + i * 0.15
        r = i * 2
        x = center[0] + math.cos(a) * r
        y = center[1] + math.sin(a) * r
        pygame.draw.circle(screen, WHITE, (int(x), int(y)), 2)

def effect_grid_float():
    for x in range(100, WIDTH, 80):
        for y in range(100, HEIGHT, 80):
            offset = math.sin(angle + (x + y) * 0.01) * 10
            pygame.draw.circle(screen, WHITE, (x, int(y + offset)), 5)

def effect_circle_ripple():
    for r in range(0, 350, 20):
        pygame.draw.circle(screen, WHITE, center, int(abs(math.sin(angle + r*0.1) * r)), 2)

def effect_wave_lines():
    for y in range(0, HEIGHT, 20):
        pygame.draw.line(screen, WHITE, (0, y + math.sin(angle + y*0.05)*20), (WIDTH, y + math.sin(angle + y*0.05)*20), 2)

def effect_expanding_squares():
    for i in range(1, 10):
        size = int(50 + math.sin(angle + i) * 40 * i)
        pygame.draw.rect(screen, WHITE, (center[0]-size//2, center[1]-size//2, size, size), 2)

def effect_rotating_lines():
    for i in range(12):
        a = angle + i * (2 * math.pi / 12)
        x = center[0] + math.cos(a) * 200
        y = center[1] + math.sin(a) * 200
        pygame.draw.line(screen, WHITE, center, (x, y), 2)

def effect_starburst():
    for i in range(50):
        a = angle + i * (2 * math.pi / 50)
        r = math.sin(angle*2 + i) * 300
        x = center[0] + math.cos(a) * r
        y = center[1] + math.sin(a) * r
        pygame.draw.circle(screen, WHITE, (int(x), int(y)), 3)

effects = [
    effect_rotating_dots,
    effect_text_wave,
    effect_tunnel,
    effect_spiral,
    effect_grid_float,
    effect_circle_ripple,
    effect_wave_lines,
    effect_expanding_squares,
    effect_rotating_lines,
    effect_starburst
]

# ---------------- MAIN LOOP ----------------
running = True
while running:
    clock.tick(60)
    angle += 0.02

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_ESCAPE:
                running = False
            if event.key == pygame.K_SPACE:
                mode = (mode + 1) % 10

    screen.fill(BLACK)

    # Draw current effect
    effects[mode]()

    # Info text
    info = font.render(f"Effect {mode + 1}/10  |  SPACE = Next", True, GRAY)
    screen.blit(info, (20, 20))

    pygame.display.flip()

pygame.quit()
sys.exit()
