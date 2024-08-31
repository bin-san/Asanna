from PIL import Image

def add_padding_to_square(image_path, output_path):
    """
    Adds padding to a rectangular image to make it a square image with a transparent background.

    Args:
        image_path (str): Path to the input image.
        output_path (str): Path to save the output square image (PNG format).
    """

    img = Image.open(image_path)
    width, height = img.size

    # Calculate the size of the square image (largest dimension)
    new_size = max(width, height)

    # Create a new blank square image with transparency (RGBA mode)
    new_img = Image.new("RGBA", (new_size, new_size), (0, 0, 0, 0))  # Transparent background

    # Calculate the position to paste the original image in the center
    left = (new_size - width) // 2
    top = (new_size - height) // 2

    # Paste the original image onto the new image
    new_img.paste(img, (left, top))

    # Save the new square image as PNG (preserves transparency)
    new_img.save(output_path, format="PNG")
    print(f"Square image saved to: {output_path}")

if __name__ == "__main__":
    image_path = "/home/point/Music/stopwatch.png"  # Replace with your image path
    output_path = "/home/point/Music/stopwatch2.png"  # Replace with desired output path (PNG)

    add_padding_to_square(image_path, output_path)