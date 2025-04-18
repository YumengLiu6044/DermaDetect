import unittest
import requests
import time

BACKEND_URL = "https://dermadetect.onrender.com"   # Change this to the backend url when testing
TEST_IMG_PATH = "skin_cancer_test.jpeg"
search_header = {"Content-Type": "application/json"}


class MyTestCase(unittest.TestCase):

    def test_root(self):
        expected_response = {"Hello": "World"}
        expected_response_code = 200
        response = requests.get(BACKEND_URL)

        self.assertEqual(response.status_code, expected_response_code)
        self.assertEqual(response.json(), expected_response)

    def test_search_doc(self):
        expected_response_code = 200
        search_endpoint = BACKEND_URL + "/findDoc"
        sample_payload = {
            "query": "melanoma",
            "page": 0,
            "getRankingInfo": True,
            "aroundRadius": 100000,
            "aroundLatLng": "37.6436195373535, -121.867645263672"
        }
        response = requests.post(search_endpoint, json=sample_payload, headers=search_header)
        self.assertEqual(response.status_code, expected_response_code)
        self.assertTrue("hits" in response.json())

    def test_search_doc_invalid_type(self):
        expected_response_code = 422
        search_endpoint = BACKEND_URL + "/findDoc"
        sample_payload = {
            "query": "melanoma",
            "page": 0,
            "getRankingInfo": True,
            "aroundRadius": 100000,
            "aroundLatLng": 123
        }
        response = requests.post(search_endpoint, json=sample_payload, headers=search_header)
        self.assertEqual(response.status_code, expected_response_code)

    def test_get_predictions(self):
        prediction_endpoint = BACKEND_URL + "/predict"
        expected_response_code = 200
        with open(TEST_IMG_PATH, "rb") as file:
            file_name = TEST_IMG_PATH.split("/")[-1]
            files = {"file": (file_name, file, "image/jpeg")}
            begin = time.time()
            response = requests.post(prediction_endpoint, files=files)
            finish = time.time()
            print(f"Elapsed time: {finish - begin}")

            self.assertEqual(expected_response_code, response.status_code)
            self.assertTrue("probabilities" in response.json())


if __name__ == '__main__':
    unittest.main()
