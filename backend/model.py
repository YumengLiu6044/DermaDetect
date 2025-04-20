from torch import nn


class DermaScannerModel(nn.Module):
    def __init__(self, num_classes=7):
        super(DermaScannerModel, self).__init__()
        self.features = nn.Sequential(
            nn.Conv2d(3, 16, kernel_size=5, padding=2),  # (64, 64)
            nn.ReLU(),
            nn.MaxPool2d(2),  # -> (32, 32)

            nn.Conv2d(16, 32, kernel_size=5, padding=2),  # (32, 32)
            nn.ReLU(),
            nn.MaxPool2d(2),  # -> (16, 16)

            nn.Conv2d(32, 64, kernel_size=5, padding=2),  # (16, 16)
            nn.ReLU(),
            nn.MaxPool2d(2),  # -> (8, 8)
        )

        self.classifier = nn.Sequential(
            nn.Flatten(),  # -> 64 * 8 * 8 = 4096
            nn.Linear(64 * 8 * 8, 128),
            nn.ReLU(),
            nn.Dropout(0.3),
            nn.Linear(128, num_classes)
        )

    def forward(self, x):
        x = self.features(x)
        x = self.classifier(x)
        return x
